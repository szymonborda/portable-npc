import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAccessToken = (token: string) =>
  AsyncStorage.setItem('accessToken', token);

export const setRefreshToken = (token: string) =>
  AsyncStorage.setItem('refreshToken', token);

export const removeAccessToken = () => AsyncStorage.removeItem('accessToken');

export const removeRefreshToken = () => AsyncStorage.removeItem('refreshToken');

export const getAccessToken = () => AsyncStorage.getItem('accessToken');

export const getRefreshToken = () => AsyncStorage.getItem('refreshToken');
