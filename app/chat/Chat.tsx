import { Stack, useLocalSearchParams } from 'expo-router';
import { Colors, Text, TextField, View } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import useGPT, { GPTMessage } from './useGPT';

export default function Chat() {
  const { title } = useLocalSearchParams();
  const { messages, addMessage } = useGPT();
  const handleAddMessage = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    addMessage(event.nativeEvent.text);
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
      <View>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </View>
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
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

interface ChatMessageProps {
  message: GPTMessage;
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  const alignment = role === 'user' ? 'flex-end' : 'flex-start';
  const backgroundColor = role === 'user' ? Colors.primary : Colors.grey30;
  return (
    <View
      style={{
        backgroundColor,
        borderRadius: 15,
        padding: 10,
        alignSelf: alignment,
        marginBottom: 10,
      }}
    >
      <Text white>{content}</Text>
    </View>
  );
}
