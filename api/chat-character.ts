import { requestHandler } from './client';

interface ChatCharacter {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const getChatCharacters = async () =>
  requestHandler<ChatCharacter[]>({
    method: 'GET',
    url: '/chat-character/',
  });
