import { configureStore } from '@reduxjs/toolkit';
import weather from './reducers/weatherSlice';

export const store = configureStore({
  reducer: {
    weather,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
