import { Colors, Text, View } from 'react-native-ui-lib';
import { ActivityIndicator } from 'react-native';
import { GPTMessage } from './useGPT';

export interface ChatMessageProps {
  message: GPTMessage;
}

export function ChatMessage({
  message: { role, content, state },
}: ChatMessageProps) {
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
        <ActivityIndicator size="small" />
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
