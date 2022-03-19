import spellerReducer, { addLetter, deleteLetter, endWord, startWord, wordList } from './spellerSlice';

describe('speller reducer', () => {
  const initialState = {
    keyboardLetters: [],
    status: 'choose-word',
    targetWord: null,
    wordInProgress: null,
    wordList: wordList,
  };

  it('should handle initial state', () => {
    expect(spellerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addLetter', () => {
    const state = {
      ...initialState,
      keyBoardLetters: ['a', 'b', 'c'],
      status: 'spell-word',
      targetWord: initialState.wordList[0],
      wordInProgress: '',
    };
    const letter = 'l';
    const actual = spellerReducer(state, addLetter(letter));
    expect(actual.wordInProgress).toEqual(letter);
  });

  it('should handle deleteLetter', () => {
    const word = 'word';
    const state = {
      ...initialState,
      targetWord: {name: "thing"},
      wordInProgress: word
    }
    const actual = spellerReducer(state, deleteLetter());
    expect(actual.wordInProgress).toEqual(word.slice(0, 3));
  });

  it('should handle deleteLetter when no letters', () => {
    const word = '';
    const actual = spellerReducer({ wordInProgress: word }, deleteLetter());
    expect(actual.wordInProgress).toEqual('');
  });

  it('should handle startWord', () => {
    const word = wordList[0];
    const state = { ...initialState };
    const actual = spellerReducer(state, startWord(word));
    expect(actual.status).toEqual('spell-word');
    expect(actual.targetWord).toEqual(word);
    expect(actual.wordInProgress).toEqual('');

    const allLetters = {};
    wordList.forEach(word => {
      word.name.split('').forEach(letter => {
        allLetters[letter] = true;
      });
    });
    const expectedLength = Math.min(Object.keys(allLetters).length, 9);
    expect(actual.keyboardLetters.length).toEqual(expectedLength);
    const keyboardLetters = {};
    actual.keyboardLetters.forEach(letter => {
      keyboardLetters[letter] = true;
      expect(allLetters[letter]).toEqual(true);
    });
    const wordLetters = word.name.split('');
    wordLetters.forEach(letter => {
      expect(keyboardLetters[letter]).toEqual(true);
    });
  });

  it('should handle endWord', () => {
    const state = {
      ...initialState,
      keyBoardLetters: ['a', 'b', 'c'],
      status: 'spell-word',
      targetWord: initialState.wordList[0],
    };
    const actual = spellerReducer(state, endWord());
    expect(actual.keyboardLetters).toEqual([]);
    expect(actual.wordInProgress).toEqual(null);
    expect(actual.status).toEqual('choose-word');
  });
});

