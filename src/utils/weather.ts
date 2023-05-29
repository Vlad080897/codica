import {} from '../redux/reducers/weatherSlice';
import {
  GetDetailedWeatherResponse,
  GetWeatherResponseType,
} from '../types/weatherTypes';

const parseDate = (date: string) => {
  const [day, time] = date.split(' ');
  const [hour] = time.split(':');

  return {
    day,
    hour: `${hour}:00`,
  };
};

export const createCityWeather = ({
  main,
  name,
  id,
  wind,
  ...data
}: GetWeatherResponseType) => ({
  id,
  name,
  temp: main.temp,
  feelsLike: main.feelsLike,
  humidity: main.humidity,
  windSpeed: wind.speed,
  coord: {
    lon: data.coord.lon,
    lat: data.coord.lat,
  },
});

export const createDailyForecast = (data: GetDetailedWeatherResponse) =>
  data.list.map((item) => ({
    dt: item.dt,
    temp: Math.round(item.main.temp),
    dtTxt: parseDate(item.dtTxt),
  }));

export const getBrightnessValue = (temp: number) => {
  if (temp < -30) {
    return 1;
  }
  if (temp < -20) {
    return 0.8;
  }
  if (temp < -10) {
    return 0.5;
  }
  if (temp < 0) {
    return 0;
  }
  if (temp < 10) {
    return 8;
  }
  if (temp <= 20) {
    return 5;
  }
  if (temp <= 30) {
    return 3;
  }
  return 1;
};

const getColor = (temp: number) => {
  if (temp < 0) {
    return {
      originalRed: 135,
      originalGreen: 206,
      originalBlue: 250,
    };
  }

  if (temp >= 0 && temp < 15) {
    return {
      originalRed: 255,
      originalGreen: 200,
      originalBlue: 100,
    };
  }

  if (temp >= 15) {
    return {
      originalRed: 255,
      originalGreen: 165,
      originalBlue: 0,
    };
  }
};

export const getColorValue = (temp: number) => {
  const {
    originalBlue = 0,
    originalGreen = 0,
    originalRed = 0,
  } = getColor(temp) || {};
  const brightnes = getBrightnessValue(temp);

  const newRed = originalRed + temp * brightnes;
  const newGreen = originalGreen + temp * brightnes;
  const newBlue = originalBlue + temp * brightnes;

  const finalRed = Math.max(0, Math.min(255, newRed));
  const finalGreen = Math.max(0, Math.min(255, newGreen));
  const finalBlue = Math.max(0, Math.min(255, newBlue));

  return `rgb(${finalRed}, ${finalGreen}, ${finalBlue})`;
};
