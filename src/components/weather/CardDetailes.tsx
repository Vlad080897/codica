import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/store';
import { CurrentWeather } from '../../redux/reducers/weatherSlice';
import {
  getCityInfo,
  getIsLoading,
} from '../../redux/selectors/weatherSelectors';
import { RootState } from '../../redux/store';
import {
  getDetailedWeather,
  getWeather,
} from '../../redux/thunks/weatherThunk';
import { getColorValue } from '../../utils/weather';
import { LoaderContainer } from '../App';
import { CircularProgress as Loader } from '@mui/material';

const CardDetailes = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const cityInfo = useSelector((state: RootState) =>
    getCityInfo(state, Number(id))
  );

  const isLoading = useSelector(getIsLoading);

  const coord = useSelector(
    ({ weather }: RootState) =>
      weather.cities.find((city) => city.id === Number(id))?.coord
  );

  const detailedWeather = useSelector(
    ({ weather }: RootState) =>
      weather.cities.find((city) => city.id === Number(id))?.detailedWeather
  );

  useEffect(() => {
    if (coord) {
      dispatch(getDetailedWeather(coord));
    } else {
      const cities = localStorage.getItem('cities');
      if (cities) {
        const currentCity = JSON.parse(cities).find(
          (city: CurrentWeather) => city.id === Number(id)
        );

        dispatch(getWeather(currentCity.name));
      }
    }
  }, [coord]);

  if (isLoading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <div>
      <h1>City: {cityInfo?.name}</h1>
      <h2>City Forecast</h2>
      <Container>
        {detailedWeather?.map((item) => {
          return (
            <TempBox gap={item.temp} key={item.dt}>
              <div>{item.temp >= 0 ? `+${item.temp}` : item.temp}</div>
            </TempBox>
          );
        })}
      </Container>
    </div>
  );
};

export default CardDetailes;

const Container = styled('div')`
  display: flex;
  padding-top: 20px;
  height: 100px;
`;

const TempBox = styled('div')<{
  gap: number;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.gap + 20}px;
  div {
    background-color: ${({ gap }) => getColorValue(gap)};
    padding: 0 15px;
  }
`;
