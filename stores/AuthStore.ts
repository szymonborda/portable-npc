import { makeAutoObservable } from 'mobx';
import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/asyncStorage';
import { verifyToken } from '@/api/client';
import { getAccount } from '@/api/auth';

class AuthStore {
  isLogged = false;

  userId = 0;

  username = '';

  email = '';

  constructor() {
    makeAutoObservable(this);
    verifyToken().then((verified) => {
      if (!verified) {
        this.logout();
      }
    });
  }

  async login({ access, refresh }: { access: string; refresh: string }) {
    this.isLogged = true;
    setAccessToken(access);
    setRefreshToken(refresh);
    const { data } = await getAccount();
    this.userId = data.id;
    this.username = data.username;
    this.email = data.email;
  }

  logout() {
    removeAccessToken();
    removeRefreshToken();
    this.isLogged = false;
    this.userId = 0;
    this.username = '';
    this.email = '';
  }
}

export default AuthStore;
