import { makeAutoObservable } from 'mobx';

class SettingsStore {
  openAIAPIKey?: string;

  constructor() {
    this.openAIAPIKey = undefined;
    makeAutoObservable(this);
  }

  setOpenAIAPIKey(apiKey: string) {
    this.openAIAPIKey = apiKey;
  }
}

export default SettingsStore;
