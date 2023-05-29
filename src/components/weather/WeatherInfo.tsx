import { Box } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { CurrentWeather } from '../../redux/reducers/weatherSlice';
import WeatherCityCard from './CityCard';
import NoInfo from './NoInfo';

type Props = {
  cities: CurrentWeather[];
};

const WeatherInfo: React.FC<Props> = ({ cities }) => {
  const haveNoCities = cities.length === 0;

  return (
    <CardsContainer>
      {haveNoCities ? (
        <NoInfo />
      ) : (
        cities.map((city) => <WeatherCityCard key={city.id} city={city} />)
      )}
    </CardsContainer>
  );
};

export default WeatherInfo;

const CardsContainer = styled(Box)`
  display: flex;
  justify-content: flex-start;
  padding-top: 20px;
  flex-wrap: wrap;
  gap: 20px;
  width: 80%;
  margin: 0 auto;
`;
