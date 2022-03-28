import { createSlice } from '@reduxjs/toolkit';

import { words } from '../../shared/words';

const initialState = {
  candidateWords: [],
  status: 'choose-word',
  targetWord: null,
  wordGuessed: null,
  wordList: words,
};

const getCandidateWords = function(wordList, word) {
  const allWords = {};
  wordList.forEach(word => allWords[word.name] = word);
  delete allWords[word.name];
  const words = [word];
  while (words.length < 6 && Object.keys(allWords).length > 0) {
    const wordNames = Object.keys(allWords);
    const rnd = Math.floor(Math.random() * (wordNames.length - 1));
    const word = allWords[wordNames[rnd]];
    words.push(word);
    delete allWords[word.name];
  }
  // Shuffle words
  for (let i = words.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = words[i];
      words[i] = words[j];
      words[j] = temp;
  }
  return words;
}

export const sounderSlice = createSlice({
  name: 'sounder',
  initialState,
  reducers: {
    endWord: (state) => {
      state.candidateWords = [];
      state.status = 'choose-word';
      state.targetWord = null;
    },
    guessWord: (state, action) => {
      const guessedWord = action.payload;
      state.status = guessedWord === state.wordChosen ? 'sounded-word' : 'sound-word';
    },
    startWord: (state, action) => {
      const wordChosen = action.payload;
      state.candidateWords = getCandidateWords(state.wordList, wordChosen);
      state.status = 'sound-word';
      state.targetWord = wordChosen;
    },
  },
});

export const { endWord, guessWord, startWord } = sounderSlice.actions;

export const selectCandidateWords = (state) => state.sounder.candidateWords;
export const selectStatus = (state) => state.sounder.status;
export const selectTargetWordName = (state) => {
  return state.sounder.status === 'sound-word' ? state.sounder.targetWord.name : '';
}
export const selectWordList = (state) => state.speller.wordList;

export default sounderSlice.reducer;
