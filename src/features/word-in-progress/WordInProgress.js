import { Wordle } from '../../components/wordle/Wordle';
export function WordInProgress(props) {
  return (
    <div>
      <h1>WordInProgress</h1>
      <Wordle current={props.current} target={props.target} />
      <div>{props.current}</div>
      <div>{props.target}</div>
    </div>);
}
