import { makeAutoObservable } from 'mobx';
import type { TranscribeLanguage } from '@/consts/languages';

class SettingsStore {
  openAIAPIKey?: string;

  transcribeLanguage = 'english' as TranscribeLanguage;

  constructor() {
    this.openAIAPIKey = undefined;
    makeAutoObservable(this);
  }

  setOpenAIAPIKey(apiKey: string) {
    this.openAIAPIKey = apiKey;
  }

  setTranscribeLanguage(language: TranscribeLanguage) {
    this.transcribeLanguage = language;
  }
}

export default SettingsStore;
