import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter, useParams } from 'react-router-dom';
import { store } from '../../../redux/store';
import CardDetailes from '../CardDetailes';
import WeatherInfo from '../WeatherInfo';
import { server } from '../../../test-utils/server';

const cities = [
  {
    id: 1,
    name: 'London',
    temp: 10,
    feelsLike: 9,
    humidity: '50',
    windSpeed: 10,
    coord: {
      lon: 1,
      lat: 1,
    },
  },
];

const mockDispatch = jest.fn();
jest.mock('../../../hooks/store', () => ({
  ...jest.requireActual('../../../hooks/store'),
  useAppDispatch: () => mockDispatch,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Preserve the original functionalities
  useParams: jest.fn(),
}));

describe('Weather Info', () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    jest.clearAllMocks();
    server.resetHandlers();
  });

  afterAll(() => server.close());

  test('should show no cities message if no cities have been requested', async () => {
    render(
      <Provider store={store}>
        <WeatherInfo cities={[]} />
      </Provider>
    );

    const noCitiesMessage = await screen.findByText(
      /sorry, you have not requested weather /i,
      {
        exact: false,
      }
    );

    expect(noCitiesMessage).toBeInTheDocument();
  });

  test('should show a list of cities if cities have been requested', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <WeatherInfo cities={cities} />
        </Provider>
      </BrowserRouter>
    );

    const city = await screen.findByText(/london/i);

    expect(city).toBeInTheDocument();
  });

  test('should dispatch a delete action when the delete button is clicked', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <WeatherInfo cities={cities} />
        </Provider>
      </BrowserRouter>
    );

    const dltBtn = await screen.findByText(/delete/i);

    userEvent.click(dltBtn);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 1,
      type: 'weather/deleteCity',
    });
  });

  test('should dispatch a get weather action when the update button is clicked', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <WeatherInfo cities={cities} />
        </Provider>
      </BrowserRouter>
    );

    const updateBtn = await screen.findByText(/update/i);

    userEvent.click(updateBtn);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test('should change route when the city card is clicked', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <WeatherInfo cities={cities} />
        </Provider>
      </BrowserRouter>
    );

    const city = await screen.findByText(/london/i);

    userEvent.click(city);

    expect(window.location.pathname).toBe(`/card/${cities[0].id}`);
  });

  test('should dispatch a get detailed weather action when the city card is clicked', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    const localStorageMock = (() => {
      let store = {
        cities: JSON.stringify(cities),
      };

      return {
        getItem: jest.fn((key) => store[key as keyof typeof store]),
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardDetailes />
        </Provider>
      </BrowserRouter>
    );

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
