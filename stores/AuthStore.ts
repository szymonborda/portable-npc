import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import { refreshAccessToken } from '@/api/auth';

class AuthStore {
  isLogged = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTokenPair({ access, refresh }: { access: string; refresh: string }) {
    this.isLogged = true;
    AsyncStorage.setItem('accessToken', access);
    AsyncStorage.setItem('refreshToken', refresh);
  }

  logout() {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    this.isLogged = false;
  }

  getAccessToken = () => AsyncStorage.getItem('accessToken');

  getRefreshToken = () => AsyncStorage.getItem('refreshToken');

  async getNewAccessToken() {
    const refreshToken = await this.getRefreshToken();
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
