import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import { refreshAccessToken } from '@/api/auth';
import { queryClient } from '@/app/Providers';

class AuthStore {
  isLogged = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTokenPair({ access, refresh }: { access: string; refresh: string }) {
    this.isLogged = true;
    queryClient.clear();
    AsyncStorage.setItem('accessToken', access);
    AsyncStorage.setItem('refreshToken', refresh);
  }

  logout() {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    this.isLogged = false;
    queryClient.clear();
  }

  static getAccessToken = () => AsyncStorage.getItem('accessToken');

  static getRefreshToken = () => AsyncStorage.getItem('refreshToken');

  static async getNewAccessToken() {
    const refreshToken = await AuthStore.getRefreshToken();
    if (!refreshToken) return undefined;
    const { data, status } = await refreshAccessToken({
      refresh: refreshToken,
    });
    if (status !== 200) return undefined;
    await AsyncStorage.setItem('accessToken', data.access);
    return data.access;
  }
}

export default AuthStore;
