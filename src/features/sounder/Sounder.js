import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  endword, guessWord, startWord,
  selectCandidateWords, selectWordsGuessed, selectStatus, selectTargetWordName, selectWordList
} from './sounderSlice';
import { scrollToTop } from '../../shared/effects';
import Card from '../../components/card/Card';
import Wordle from '../../components/wordle/Wordle';
import styles from './Sounder.module.css';

export function Sounder() {
  const dispatch = useDispatch();
  const candidateWords = useSelector(selectCandidateWords);
  const status = useSelector(selectStatus);
  const targetWordName = useSelector(selectTargetWordName);
  const wordList = useSelector(selectWordList);
  const wordsGuessed = useSelector(selectWordsGuessed);

  const candiateWordsTags = candidateWords.map(word => {
    let cardClass = null;
    if (wordsGuessed[word.name] ) {
      if (targetWordName == word.name) {
        cardClass = styles.correctWord;
      } else {
        cardClass = styles.incorrectWord;
      }
    }
    return (
      <Card className={cardClass} key={word.name} onClick={() => dispatch(guessWord(word))}>
        <img className={styles.icon} src={word.imagePath} alt={word.name} />
      </Card>
    );
  });

  const words = wordList.map(word => {
    return (
      <div key={word.name} onClick={() => dispatch(startWord(word))}>
        {word.name}
      </div>
    );
  });

  const targetWordLetters = targetWordName.split('').map((letter, index) => {
    return <div key={index} className={styles.letterTile}>{letter}</div>
  });

  useEffect(scrollToTop);

  return (
    <div>
      <div className={styles.letterTilesRow}>{targetWordLetters}</div>
      <div className={styles.row}>{candiateWordsTags}</div>
      <div className={styles.row}>{words}</div>
    </div>
  );
}
