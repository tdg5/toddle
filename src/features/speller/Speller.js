import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addLetter, deleteLetter, selectKeyboardLetters, selectTargetWord,
  selectWordInProgress, selectWordList, startWord
} from './spellerSlice';
import styles from './Speller.module.css';
import { Wordle } from '../../components/wordle/Wordle';

export function Speller() {
  const dispatch = useDispatch();
  const keyboardLetters = useSelector(selectKeyboardLetters);
  const wordInProgress = useSelector(selectWordInProgress);
  const wordList = useSelector(selectWordList);
  const targetWord = useSelector(selectTargetWord);

  const letters = keyboardLetters.map(letter => {
    return <button key={letter} className={`${styles.letter}`} onClick={() => dispatch(addLetter(letter))}>{letter}</button>
  });

  if (letters.length > 0) {
    letters.push(<button key={"deleteLetter"} className={`${styles.letter}`} onClick={() => dispatch(deleteLetter())}>&lt;&lt;</button>);
  }

  function Header(props) {
    if (targetWord) {
      return (<div className={`${styles.item} ${styles.icon}`}><img src={targetWord.imagePath} alt={targetWord.name} /></div>);
    } else {
      return (<h1>Pick a word to spell!</h1>);
    }
  }

  const words = wordList.map(word => {
    return (
      <div className={`${styles.item} ${styles.icon}`} key={word.name} onClick={() => dispatch(startWord(word))}>
        <img src={word.imagePath} alt={word.name} />
      </div>
    );
  });

  return (
    <div className={styles.thinger}>
      <Header />
      <div>
        <Wordle
          current={wordInProgress}
          target={targetWord && targetWord.name} />
      </div>
      <div className={styles.row}>
        {letters}
      </div>
      <div className={styles.row}>
        {words}
      </div>
    </div>
  );
}
