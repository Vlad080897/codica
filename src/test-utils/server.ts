import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('https://api.openweathermap.org/data/2.5/weather', (_, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(
    'https://api.openweathermap.org/data/2.5/forecast',
    (_, res, ctx) => {
      return res(ctx.json({}));
    }
  ),
];

export const server = setupServer(...handlers);
