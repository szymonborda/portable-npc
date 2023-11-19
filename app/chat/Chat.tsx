import { Stack, useLocalSearchParams } from 'expo-router';
import { Colors, Text, TextField, View } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  type NativeSyntheticEvent,
  type TextInputSubmitEditingEventData,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useRef } from 'react';
import useGPT, { GPTMessage } from './useGPT';

export default function Chat() {
  const { title } = useLocalSearchParams();
  const { messages, addMessage, isPending, isError } = useGPT();
  const inputRef = useRef<TextInput>(null);
  const handleAddMessage = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    addMessage(event.nativeEvent.text);
    inputRef.current?.clear();
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
          title: `Chat with ${title}`,
          headerRight: () => null,
        }}
      />
      <ScrollView style={{ maxHeight: 700 }}>
        {messages.map((message, index) => (
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
        }}
      >
        <TextField
          placeholder="Start writing..."
          style={{ paddingTop: 10 }}
          onSubmitEditing={handleAddMessage}
          editable={!isPending}
          ref={inputRef}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

interface ChatMessageProps {
  message: GPTMessage;
}

function ChatMessage({ message: { role, content, state } }: ChatMessageProps) {
  const alignment = role === 'user' ? 'flex-end' : 'flex-start';
  const backgroundColor = role === 'user' ? Colors.primary : Colors.grey30;
  const viewStyles = {
    backgroundColor,
    borderRadius: 15,
    padding: 10,
    alignSelf: alignment,
    marginBottom: 10,
  } as const;

  if (state === 'pending') {
    return (
      <View
        style={{
          ...viewStyles,
        }}
      >
        <Text white>...</Text>
      </View>
    );
  }

  if (state === 'error') {
    return (
      <View
        style={{
          ...viewStyles,
          backgroundColor: Colors.red30,
        }}
      >
        <Text white>
          There was an error with processing your message. Please make sure that
          your OpenAI API key is valid and try again later.
        </Text>
      </View>
    );
  }

  return (
    <View style={viewStyles}>
      <Text white>{content}</Text>
    </View>
  );
}
