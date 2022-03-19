import React, { useState } from 'react';
import styles from './Wordle.module.css';

export function Wordle(props) {
  return (<div><h1>{props.target}</h1><h2>{props.current}</h2></div>);
}
