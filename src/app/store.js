import { configureStore } from '@reduxjs/toolkit';
import spellerReducer from '../features/speller/spellerSlice';
import gameSelectorReducer from '../features/gameSelector/gameSelectorSlice';
import sounderReducer from '../features/sounder/sounderSlice';

export const store = configureStore({
  reducer: {
    gameSelector: gameSelectorReducer,
    sounder: sounderReducer,
    speller: spellerReducer,
  },
});
