import { callApi } from './callApi';

export const weatherApi = {
  getWeather: (city: string) =>
    callApi({
      url: `weather?q=${city}`,
    }),
  getDetailedWeather: (lat: number, lon: number) =>
    callApi({
      url: `forecast?lat=${lat}&lon=${lon}&cnt=8`,
    }),
};
