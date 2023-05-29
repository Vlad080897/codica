import { createAsyncThunk } from '@reduxjs/toolkit';
import { weatherApi } from '../../api/weatherApi';
import {
  GetDetailedWeatherResponse,
  GetWeatherResponseType,
} from '../../types/weatherTypes';

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city: string) => {
    const response = await weatherApi.getWeather(city);
    return response.data as GetWeatherResponseType;
  }
);

export const updateWeather = createAsyncThunk(
  'weather/updateWeather',
  async (cities: string[]) => {
    const allRequests = cities.map(async (city) => {
      const response = await weatherApi.getWeather(city);
      return response.data;
    });

    const results = await Promise.all(allRequests);

    return results as GetWeatherResponseType[];
  }
);

export const getDetailedWeather = createAsyncThunk(
  'weather/getDetailedWeather',
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const response = await weatherApi.getDetailedWeather(lat, lon);
    return response.data as GetDetailedWeatherResponse;
  }
);
