import { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from './api';

type BaseQueryParams = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
};

export const callApi = async ({
  url,
  data,
  method = 'GET',
  params,
}: BaseQueryParams) => {
  try {
    const response = await api.request({
      url: `${url}&units=metric&appid=2509a44af5b396c993ad21e7d52eeb59`,
      method,
      data,
      params,
      baseURL: 'https://api.openweathermap.org/data/2.5/',
    });

    return { data: response.data };
  } catch (error) {
    let err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data.message || err.message);
  }
};
