import { useState } from 'react';

export interface GPTMessage {
  role: 'function' | 'system' | 'user' | 'assistant';
  content: string | null;
}

export default function useGPT() {
  const [messages, setMessages] = useState<GPTMessage[]>([
    {
      role: 'system',
      content:
        'Hello, I am GPT-3. How can I help you today? sielalalala bum cyk cyk',
    },
  ]);

  const addMessage = (content: string) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content },
    ]);
  };

  return {
    messages,
    addMessage,
  };
}
