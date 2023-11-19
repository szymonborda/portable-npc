import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useStores from '@/stores/useStores';
import { addMessage as addMessagePost } from '@/api/chat';

export interface GPTMessage {
  role: 'function' | 'system' | 'user' | 'assistant';
  content: string | null;
  state: 'pending' | 'success' | 'error';
}

export default function useGPT() {
  const [messages, setMessages] = useState<GPTMessage[]>([]);
  const { settings } = useStores();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ['postMessage'],
    mutationFn: addMessagePost,
    onSuccess: (data) => {
      if (!data) return;
      setMessages((currentMessages) => [
        ...currentMessages,
        { ...data.message, state: 'success' },
      ]);
    },
  });

  const addMessage = (content: string) => {
    const newMessages = [
      ...messages,
      { role: 'user' as const, content, state: 'success' as const },
    ];
    mutate({
      messages: newMessages,
      context: 'You are Dwarf Edward. Help the explorer on his journey.',
      openai_api_key: settings.openAIAPIKey ?? '',
    });
    setMessages(newMessages);
  };

  return {
    messages,
    addMessage,
    isPending,
    isError,
  };
}
