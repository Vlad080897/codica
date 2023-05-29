import { CurrentWeather } from '../redux/reducers/weatherSlice';

export type Detailes = {
  main: {
    temp: number;
  };
  dtTxt: string;
  dt: number;
};

export type GetDetailedWeatherResponse = {
  list: Detailes[];
  city: {
    name: string;
    id: number;
  };
};

export type GetWeatherResponseType = {
  main: Omit<CurrentWeather, 'id' | 'windSpeed' | 'name'>;
  name: string;
  id: number;
  wind: {
    speed: number;
  };
  coord: {
    lon: number;
    lat: number;
  };
};
