import React from 'react';
import styles from './Wordle.module.css';

const INCORRECT_LETTER = 0;
const CORRECT_LETTER = 1;
const CORRECT_LETTER_AND_POSITION = 2;

function diffWords(current, target) {
  const letterClassifications = [];
  const targetLettersLookup = {};
  const targetLetters = target.split('');
  for (let i = 0; i < targetLetters.length; i++) {
    const targetLetter = targetLetters[i];
    if (!(targetLetter in targetLettersLookup)) {
      targetLettersLookup[targetLetter] = 0;
    }
    targetLettersLookup[targetLetter] += 1;
  }
  for (let i = 0; i < current.length; i++) {
    let classification = 0;
    const currentLetter = current[i];
    const targetLetter = target[i];
    if (currentLetter === targetLetter) {
      classification += 1;
    }
    if (currentLetter in targetLettersLookup && targetLettersLookup[currentLetter] > 0) {
      classification += 1;
      targetLettersLookup[currentLetter] -= 1;
    }
    letterClassifications.push(classification);
  }

  return letterClassifications;
}

export function Wordle(props) {
  if (!props.target) { return (<div></div>); }

  const lettersClasses = [];
  const letterClassifications = diffWords(props.current, props.target);
  for (let i = 0; i < props.current.length; i++) {
    const classes = [styles.tile];
    switch (letterClassifications[i]) {
      case(INCORRECT_LETTER):
        classes.push(styles.incorrectLetter);
        break;
      case(CORRECT_LETTER_AND_POSITION):
        classes.push(styles.correctPosition);
        // fall through
      case (CORRECT_LETTER):
        classes.push(styles.correctLetter);
        break;
      default:
        // noop
    }
    lettersClasses.push(classes);
  }

  for (let i = 0; i < (props.target.length - props.current.length); i++) {
    lettersClasses.push([styles.tile, styles.blankLetter]);
  }
  const letters = [];
  for (let i = 0; i < lettersClasses.length; i++) {
    const classNames = lettersClasses[i].join(" ");
    const letterText = i < props.current.length ? props.current[i] : ' ';
    const elem = (<div key={i} className={classNames}>{letterText}</div>);
    letters.push(elem);
  }
  return (<div className={styles.wordle}>{letters}</div>);
}
