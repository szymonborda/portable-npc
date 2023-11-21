import { z } from 'zod';
import { requestHandler } from './client';

export const ObtainTokenPairSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const RegisterSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type ObtainTokenPairData = z.infer<typeof ObtainTokenPairSchema>;

type RegisterData = z.infer<typeof RegisterSchema>;

export interface ObtainTokenPairResponse {
  access: string;
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface RegisterResponse {
  username: string;
  email: string;
}

export interface AccountResponse {
  id: number;
  username: string;
  email: string;
}

export const obtainTokenPair = async (data: ObtainTokenPairData) =>
  requestHandler<ObtainTokenPairResponse>({
    method: 'POST',
    url: '/token/',
    data,
  });

export const refreshAccessToken = async (data: { refresh: string }) =>
  requestHandler<RefreshTokenResponse>({
    method: 'POST',
    url: '/token/refresh/',
    data,
  });

export const register = async (data: RegisterData) =>
  requestHandler<RegisterResponse>({
    method: 'POST',
    url: '/users/',
    data,
  });

export const getAccount = async () =>
  requestHandler<AccountResponse>({
    method: 'GET',
    url: '/account/',
  });
