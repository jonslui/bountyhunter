import React from 'react';
import LevelSelectTile from './components/LevelSelectTile';
import Header from './components/Header';
import styles from './Main.module.css';

const Main = () => {
  return (
    <div>
      <Header />
      <div className = { styles.selectorContainer } >
        <LevelSelectTile  />
      </div>
    </div>

  )
}

export default Main;