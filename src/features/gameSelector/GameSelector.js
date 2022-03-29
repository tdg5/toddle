import { useSelector, useDispatch } from 'react-redux';
import { chooseGame, selectChosenGame } from './gameSelectorSlice'
// Move these dependencies up so the app feeds them to the game selector?
import { Speller } from '../speller/Speller';
import { Sounder } from '../sounder/Sounder';
import Card from '../../components/card/Card';
import styles from './GameSelector.module.css'

function Game(props) {
  let game = null;
  if (props.chosenGame == 'speller') {
    game = <Speller />;
  }
  else if (props.chosenGame == 'sounder') {
    game = <Sounder />;
  }
  return game;
}

function Menu(props) {
  const dispatch = useDispatch();
  return (
    <div className={styles.gameSelector}>
      <Card onClick={() => dispatch(chooseGame('speller'))}>
        <img className={styles.icon} src={'images/words/bee.png'} alt="Spelling Bee" />
        <div>Spelling Bee</div>
      </Card>
      <Card onClick={() => dispatch(chooseGame('sounder'))}>
        <img className={styles.icon} src={'images/words/ear.png'} alt="Sound It Out" />
        <div>Sound It Out</div>
      </Card>
    </div>
  );
}

export function GameSelector() {
  const chosenGame = useSelector(selectChosenGame);
  const elem = chosenGame ? <Game chosenGame={chosenGame} /> : <Menu />;
  return <div>{elem}</div>;
}
