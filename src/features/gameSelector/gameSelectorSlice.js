import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenGame: null
};

export const gameSelectorSlice = createSlice({
  name: 'gameSelector',
  initialState,
  reducers: {
    chooseGame: (state, action) => {
      state.chosenGame = action.payload;
    }
  }
});

export const { chooseGame } = gameSelectorSlice.actions;

export const selectChosenGame = (state) => state.gameSelector.chosenGame;

export default gameSelectorSlice.reducer;
