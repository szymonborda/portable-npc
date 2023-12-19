import { requestHandler } from './client';
import { TranscribeLanguage } from '@/consts/languages';

export interface TranscribeResponse {
  message: string;
}

export interface TranscribeRequest {
  audio: {
    uri: string;
    name: string;
    type: string;
  };
  language: TranscribeLanguage;
}

export const transcribe = async (data: TranscribeRequest) => {
  const formData = new FormData();
  formData.append('language', data.language);
  // @ts-expect-error - FormData type is not correct
  formData.append('audio', data.audio);
  return requestHandler<TranscribeResponse>({
    method: 'POST',
    url: '/transcribe/',
    data: formData,
  });
};
