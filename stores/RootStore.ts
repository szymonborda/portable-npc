import { AsyncTrunk } from 'mobx-sync';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OpenAIStore from './OpenAIStore';

class RootStore {
  openAI: OpenAIStore;

  constructor() {
    this.openAI = new OpenAIStore();
  }
}

export const rootStore = new RootStore();

export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
});

export default RootStore;
