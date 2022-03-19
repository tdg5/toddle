import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addLetter, deleteLetter, selectKeyboardLetters, selectStatus, selectTargetWord,
  selectWordInProgress, selectWordList, startWord
} from './spellerSlice';
import styles from './Speller.module.css';
import { WordInProgress } from '../word-in-progress/WordInProgress';

export function Speller() {
  const dispatch = useDispatch();
  const keyboardLetters = useSelector(selectKeyboardLetters);
  const wordInProgress = useSelector(selectWordInProgress);
  const wordList = useSelector(selectWordList);
  const status = useSelector(selectStatus);
  const targetWord = useSelector(selectTargetWord);

  const banner = status === "spelled-word" ? <h1>Yay!</h1> : null;

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
      <WordInProgress
        current={wordInProgress}
        target={targetWord && targetWord.name} />
      <h2>{wordInProgress}</h2>
      {banner}
      <div className={styles.row}>
        {letters}
      </div>
      <div className={styles.row}>
        {words}
      </div>
    </div>
  );
}
