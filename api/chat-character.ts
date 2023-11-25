import { z } from 'zod';
import { requestHandler } from './client';

interface ChatCharacter {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const AddCharacterSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  image: z.object({
    name: z.string(),
    type: z.string(),
    uri: z.string(),
  }),
});

export type AddCharacterData = z.infer<typeof AddCharacterSchema>;

export const getChatCharacters = async () =>
  requestHandler<ChatCharacter[]>({
    method: 'GET',
    url: '/chat-character/',
  });

export const addChatCharacter = async (data: AddCharacterData) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  // @ts-expect-error - FormData type is not correct
  formData.append('image', data.image);
  return requestHandler<ChatCharacter>({
    method: 'POST',
    url: '/chat-character/',
    data: formData,
  });
};
