import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.1.102:8000/api/',
  timeout: 60000,
});

export const requestHandler = async <Response>(
  requestConfig: AxiosRequestConfig,
) => {
  try {
    const { data } = await client<Response>(requestConfig);
    return data;
  } catch (error) {
    console.error('API error: ', error);
  }
};
