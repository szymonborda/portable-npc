/* eslint-disable no-underscore-dangle */
import axios, { AxiosRequestConfig } from 'axios';
import { rootStore } from '@/stores/RootStore';

export const client = axios.create({
  baseURL: 'http://192.168.1.101:8000/api/',
  timeout: 60000,
});

client.interceptors.request.use(
  async (config) => {
    const access = await rootStore.auth.getAccessToken();
    if (access) {
      config.headers.set('Authorization', `Bearer ${access}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const TOKEN_RELATED_URLS = ['/token/', '/token/refresh/'];

const shouldGetNewAccessToken = <
  E extends {
    response?: { status?: number };
    config?: { _retry?: boolean; url?: string };
  },
>({
  response,
  config,
}: E) =>
  response?.status === 401 &&
  !config?._retry &&
  !TOKEN_RELATED_URLS.includes(config?.url ?? '');

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (shouldGetNewAccessToken(error)) {
      config._retry = true;
      const accessToken = await rootStore.auth.getNewAccessToken();
      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return client(config);
    }
    return Promise.reject(error);
  },
);

export const requestHandler = async <Response>(
  requestConfig: AxiosRequestConfig,
) => client<Response>(requestConfig);
