import { AsyncTrunk } from 'mobx-sync';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SettingsStore from './SettingsStore';

class RootStore {
  settings: SettingsStore;

  constructor() {
    this.settings = new SettingsStore();
  }

  getStores() {
    return {
      settings: this.settings,
    };
  }
}

export const rootStore = new RootStore();

export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
});

export default RootStore;
