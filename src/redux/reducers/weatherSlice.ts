import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getDetailedWeather,
  getWeather,
  updateWeather,
} from '../thunks/weatherThunk';
import { createCityWeather, createDailyForecast } from '../../utils/weather';

export type CurrentWeather = {
  id: number;
  name: string;
  temp: number;
  feelsLike: number;
  humidity: string;
  windSpeed: number;
  coord: {
    lon: number;
    lat: number;
  };
  detailedWeather?: {
    temp: number;
    dt: number;
    dtTxt: {
      day: string;
      hour: string;
    };
  }[];
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    cities: [] as CurrentWeather[],
    isLoading: true,
    error: null as { message: string } | null,
  },
  reducers: {
    deleteCity: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
      const currentCitiesInStorage = JSON.parse(
        localStorage.getItem('cities') || '[]'
      );
      localStorage.setItem(
        'cities',
        JSON.stringify(
          currentCitiesInStorage.filter(
            (city: CurrentWeather) => city.id !== action.payload
          )
        )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        const { id } = action.payload;
        const isUpdate = state.cities.find((city) => city.id === id);

        if (isUpdate) {
          // If the city already exists, update its data
          state.cities = state.cities.map((city) =>
            city.id === id ? createCityWeather(action.payload) : city
          );
        } else {
          // If it's a new city, add it to the list
          const newCityWeather = createCityWeather(action.payload);
          state.cities.push(newCityWeather);

          const currentCitiesInStorage = JSON.parse(
            localStorage.getItem('cities') || '[]'
          );
          const isCityInStorage = currentCitiesInStorage.find(
            (city: CurrentWeather) => city.id === id
          );

          if (!isCityInStorage) {
            // Store the new city in localStorage if it's not already there
            localStorage.setItem(
              'cities',
              JSON.stringify([...currentCitiesInStorage, newCityWeather])
            );
          }
        }
        state.isLoading = false;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.error.message || 'Something went wrong',
        };
      })
      .addCase(updateWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWeather.fulfilled, (state, action) => {
        // Update the weather data for all cities
        state.cities = action.payload.map(createCityWeather);
        state.isLoading = false;
      })
      .addCase(updateWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.error.message || 'Something went wrong',
        };
      })
      .addCase(getDetailedWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailedWeather.fulfilled, (state, action) => {
        // Update the detailed weather information for a specific city
        state.cities = state.cities.map((city) =>
          city.name === action.payload.city.name
            ? {
                ...city,
                detailedWeather: createDailyForecast(action.payload),
              }
            : city
        );
        state.isLoading = false;
      })
      .addCase(getDetailedWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.error.message || 'Something went wrong',
        };
      });
  },
});

export const { deleteCity } = weatherSlice.actions;

export default weatherSlice.reducer;
