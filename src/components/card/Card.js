import styles from './Card.module.css';

export default function Card(props) {
  return <div onClick={props.onClick} className={styles.card}>{props.children}</div>;
}
