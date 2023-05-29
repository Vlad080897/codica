import { RootState } from '../../redux/store';

export const getCitiesWeather = (state: RootState) => state.weather.cities;

export const getCityInfo = (state: RootState, id: number) =>
  state.weather.cities.find((city) => city.id === id);

export const getIsLoading = (state: RootState) => state.weather.isLoading;

export const getError = (state: RootState) => state.weather.error;
