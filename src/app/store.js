import { configureStore } from '@reduxjs/toolkit';
import spellerReducer from '../features/speller/spellerSlice';

export const store = configureStore({
  reducer: {
    speller: spellerReducer,
  },
});
