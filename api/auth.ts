import { z } from 'zod';
import { requestHandler } from './client';

export const ObtainTokenPairSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const RegisterSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const ChangePasswordSchema = z.object({
  old_password: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
  new_password: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
});

type ObtainTokenPairData = z.infer<typeof ObtainTokenPairSchema>;

type RegisterData = z.infer<typeof RegisterSchema>;

type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;

export interface ObtainTokenPairResponse {
  access: string;
  refresh: string;
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

export const changePassword = async (data: ChangePasswordData) =>
  requestHandler<AccountResponse>({
    method: 'PUT',
    url: '/account/password/',
    data,
  });

export const deleteAccount = async () =>
  requestHandler<undefined>({
    method: 'DELETE',
    url: '/account/',
  });
