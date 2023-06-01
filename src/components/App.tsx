import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/store';
import { CurrentWeather, toggleLoading } from '../redux/reducers/weatherSlice';
import {
  getCitiesWeather,
  getIsLoading,
} from '../redux/selectors/weatherSelectors';
import { getWeather, updateWeather } from '../redux/thunks/weatherThunk';
import SearchBlock from './weather/SearchBlock';
import WeatherInfo from './weather/WeatherInfo';
import { Box, CircularProgress as Loader } from '@mui/material';
import styled from 'styled-components';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const cities = useSelector(getCitiesWeather);
  const IsLoading = useSelector(getIsLoading);

  useEffect(() => {
    const isCitiesInLocalStorage = localStorage.getItem('cities');
    if (isCitiesInLocalStorage) {
      const cities = JSON.parse(isCitiesInLocalStorage);
      const citiesNames = cities.map((city: CurrentWeather) => city.name);
      dispatch(updateWeather(citiesNames));
    } else {
      dispatch(toggleLoading());
    }
  }, []);

  const handleWeatherSearch = (city: string) => {
    dispatch(getWeather(city));
  };

  if (IsLoading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <div>
      <SearchBlock handleSearch={handleWeatherSearch} />
      <WeatherInfo cities={cities} />
    </div>
  );
};

export default App;

export const LoaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
