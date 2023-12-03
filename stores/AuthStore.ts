import { makeAutoObservable } from 'mobx';
import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/asyncStorage';

class AuthStore {
  isLogged = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTokenPair({ access, refresh }: { access: string; refresh: string }) {
    this.isLogged = true;
    setAccessToken(access);
    setRefreshToken(refresh);
  }

  logout() {
    removeAccessToken();
    removeRefreshToken();
    this.isLogged = false;
  }
}

export default AuthStore;
