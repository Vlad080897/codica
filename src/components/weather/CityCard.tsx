import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/store';
import { CurrentWeather, deleteCity } from '../../redux/reducers/weatherSlice';
import { getWeather } from '../../redux/thunks/weatherThunk';

type Props = {
  city: CurrentWeather;
};

const WeatherCityCard: React.FC<Props> = ({ city }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`/card/${city.id}`);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteCity(city.id));
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(getWeather(city.name));
  };

  return (
    <Card onClick={handleNavigate}>
      <div>
        <div>City: {city.name}</div>
        <div>Tempreature: {Math.round(city.temp)}</div>
        <div>Feels like: {Math.round(city.feelsLike)}</div>
        <div>Humidity: {city.humidity}</div>
        <div>Wind Speed: {city.windSpeed}</div>
      </div>
      <div>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ mr: 2 }}
        >
          Delete
        </Button>
        <Button variant="contained" color="info" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </Card>
  );
};

export default WeatherCityCard;

const Card = styled('div')`
  width: 250px;
  height: 300px;
  border: 1px solid black;
  background-color: #ffff;
  border-radius: 10px;

  div {
    padding: 10px;
  }

  cursor: pointer;

  :hover {
    background-color: #f5f5f5;
  }
`;
