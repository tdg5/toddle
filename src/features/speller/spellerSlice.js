import { createSlice } from '@reduxjs/toolkit';

import { words } from '../../shared/words';

const initialState = {
  keyboardLetters: [],
  status: 'choose-word',
  targetWord: null,
  wordInProgress: null,
  wordList: words,
};

const getKeyboardLetters = function(wordList, word) {
  const allLetters = {};
  wordList.forEach(word => {
    word.name.split('').forEach(letter => {
      allLetters[letter] = true;
    });
  });
  let letters = word.name.split('');
  letters.forEach(letter => delete allLetters[letter]);
  while (letters.length < 8 && Object.keys(allLetters).length > 0) {
    const candidateLetters = Object.keys(allLetters);
    const rnd = Math.floor(Math.random() * (candidateLetters.length - 1));
    const letter = candidateLetters[rnd];
    letters.push(letter);
    delete allLetters[letter];
  }
  // Shuffle letters
  for (let i = letters.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = letters[i];
      letters[i] = letters[j];
      letters[j] = temp;
  }
  return letters;
}

export const spellerSlice = createSlice({
  name: 'speller',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addLetter: (state, action) => {
      state.wordInProgress += action.payload;
      state.status = state.wordInProgress === state.targetWord.name ? "spelled-word" : "spell-word";
    },
    deleteLetter: (state) => {
      if (state.wordInProgress.length > 0) {
        state.wordInProgress = state.wordInProgress.slice(0, -1);
        state.status = state.wordInProgress === state.targetWord.name ? "spelled-word" : "spell-word";
      }
    },
    endWord: (state) => {
      state.keyboardLetters = [];
      state.status = 'choose-word';
      state.targetWord = null;
    },
    startWord: (state, action) => {
      const wordChosen = action.payload;
      state.keyboardLetters = getKeyboardLetters(state.wordList, wordChosen);
      state.status = 'spell-word';
      state.targetWord = wordChosen;
      state.wordInProgress = '';
    },
  },
});

export const { addLetter, deleteLetter, endWord, startWord } = spellerSlice.actions;

export const selectKeyboardLetters = (state) => state.speller.keyboardLetters;
export const selectWordInProgress = (state) => state.speller.wordInProgress;
export const selectWordList = (state) => state.speller.wordList;
export const selectTargetWordName = (state) => {
  return state.speller.status === 'spell-word' ? state.speller.targetWord.name : '';
}
export const selectTargetWordImagePath = (state) => {
  return state.speller.status === 'spell-word' ? state.speller.targetWord.imagePath : '';
}
export const selectTargetWord = (state) => {
  return state.speller.targetWord;
}

export default spellerSlice.reducer;
