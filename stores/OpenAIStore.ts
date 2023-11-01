import { makeAutoObservable } from 'mobx';

class OpenAIStore {
  apiKey?: string;

  constructor() {
    this.apiKey = undefined;
    makeAutoObservable(this);
  }
}

export default OpenAIStore;
