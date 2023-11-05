import { GPTMessage } from '@/app/chat/useGPT';
import { requestHandler } from './client';

export interface GPTResponse {
  message: GPTMessage;
}

export interface GPTRequest {
  messages: GPTMessage[];
  context: string;
  openai_api_key: string;
}

export const addMessage = async (data: GPTRequest) =>
  requestHandler<GPTResponse>({
    method: 'POST',
    url: '/chat/',
    data,
  });
