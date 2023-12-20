import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Colors, TextField, View } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Alert,
  type NativeSyntheticEvent,
  type TextInputSubmitEditingEventData,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMutation } from '@tanstack/react-query';
import useGPT from './useGPT';
import useStores from '@/stores/useStores';
import { ChatMessage } from './ChatMessage';
import Transcriber from '@/components/Transcriber/Transcriber';
import { deleteChatCharacter } from '@/api/chat-character';

function Chat() {
  const { name, description, id } = useLocalSearchParams();
  const {
    settings: { openAIAPIKey },
  } = useStores();
  const { messages, addMessage, isPending, isError } = useGPT({
    name,
    description,
  } as any);
  const inputRef = useRef<TextInput>(null);
  const handleAddMessage = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    addMessage(event.nativeEvent.text);
    inputRef.current?.clear();
  };

  const { mutate } = useMutation({
    mutationFn: deleteChatCharacter,
    onSuccess: () => {
      router.replace({ pathname: '/' });
    },
  });

  useEffect(() => {
    if (!openAIAPIKey) {
      Alert.alert(
        'OpenAI API Key is missing',
        'Please go to App Settings and enter your OpenAI API Key.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              router.back();
            },
          },
          {
            text: 'Go to App Settings',
            onPress: () => {
              router.replace({ pathname: '/settings/app' });
            },
          },
        ],
      );
    }
  }, [openAIAPIKey]);

  const handleDelete = () => {
    Alert.alert(
      'Delete character',
      'Are you sure you want to delete this character?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            mutate(Number(id));
          },
        },
      ],
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        padding: 10,
        flexGrow: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: `${name}`,
          headerRight: () =>
            id ? (
              <Icon.Button
                name="trash"
                backgroundColor={Colors.transparent}
                color={Colors.white}
                style={{ paddingLeft: 20 }}
                onPress={handleDelete}
              />
            ) : null,
        }}
      />
      <ScrollView style={{ maxHeight: 700 }}>
        {messages.map((message, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ChatMessage key={index} message={message} />
        ))}
        {isPending && (
          <ChatMessage
            message={{ role: 'assistant', state: 'pending', content: null }}
          />
        )}
        {isError && (
          <ChatMessage
            message={{ role: 'assistant', state: 'error', content: null }}
          />
        )}
      </ScrollView>
      <View
        style={{
          marginBottom: 20,
          height: 50,
          borderTopWidth: 1,
          borderColor: '#ccc',
          justifyContent: 'space-between',
        }}
        row
      >
        <TextField
          placeholder="Start writing..."
          style={{ paddingTop: 10 }}
          onSubmitEditing={handleAddMessage}
          editable={!isPending}
          ref={inputRef}
        />
        <Transcriber setResult={addMessage} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default observer(Chat);
