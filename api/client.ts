/* eslint-disable no-underscore-dangle */
import axios, { AxiosRequestConfig } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from '@/utils/asyncStorage';

export const client = axios.create({
  baseURL: 'https://borda.software/api/',
  timeout: 60000,
});

client.interceptors.request.use(
  async (config) => {
    const access = await getAccessToken();
    if (access) {
      config.headers.set('Authorization', `Bearer ${access}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const requestHandler = async <Response>(
  requestConfig: AxiosRequestConfig,
) => client<Response>(requestConfig);

interface RefreshTokenResponse {
  access: string;
}

const refreshAccessToken = async (data: { refresh: string }) =>
  requestHandler<RefreshTokenResponse>({
    method: 'POST',
    url: '/token/refresh/',
    data,
  });

const getNewAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return undefined;
  const { data, status } = await refreshAccessToken({
    refresh: refreshToken,
  });
  if (status !== 200) return undefined;
  await setAccessToken(data.access);
  return data.access;
};

export const verifyToken = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return false;
  try {
    await client.post('/token/verify/', { token: accessToken });
    return true;
  } catch (error) {
    return false;
  }
};

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
      const accessToken = await getNewAccessToken();
      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
        return client(config);
      }
    }
    return Promise.reject(error);
  },
);
