import React from 'react';
import LevelSelectTile from './components/LevelSelectTile';
import styles from './Main.module.css';
import Game from './Game';

const Main = () => {

  return (
    <div className = { styles.selectorContainer } >
      {/* <LevelSelectTile />
      <LevelSelectTile />
      <LevelSelectTile /> */}

      <Game />
    </div>
  )
}

export default Main;