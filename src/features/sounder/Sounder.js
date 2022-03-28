import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  endword, guessWord, startWord,
  selectCandidateWords, selectStatus, selectTargetWordName, selectWordList
} from './sounderSlice';
import { scrollToTop } from '../../shared/effects';
import Card from '../../components/card/Card';
import styles from './Sounder.module.css';

export function Sounder() {
  const dispatch = useDispatch();
  const candidateWords = useSelector(selectCandidateWords);
  const status = useSelector(selectStatus);
  const targetWordName = useSelector(selectTargetWordName);
  const wordList = useSelector(selectWordList);

  const candiateWordsTags = candidateWords.map(word => {
    return (
      <Card key={word.name} onClick={() => dispatch(guessWord(word))}>
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

  useEffect(scrollToTop);

  return (<div>
    <div>Sounder</div>
    <div>{targetWordName}</div>
    <div className={styles.row}>{candiateWordsTags}</div>
    <div className={styles.row}>{words}</div>
  </div>);
}
