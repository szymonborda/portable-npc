import { AsyncTrunk } from 'mobx-sync';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SettingsStore from './SettingsStore';
import AuthStore from './AuthStore';

class RootStore {
  settings: SettingsStore;

  auth: AuthStore;

  constructor() {
    this.settings = new SettingsStore();
    this.auth = new AuthStore();
  }

  getStores() {
    return {
      settings: this.settings,
      auth: this.auth,
    };
  }
}

export const rootStore = new RootStore();

export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
});

export default RootStore;
