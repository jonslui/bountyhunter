import React, { useEffect } from 'react';
import { getFirebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';
import styles from './Highscores.module.css';

const Highscores = () => {
  const { boardName } = useLocation().state
  const config = getFirebaseConfig();
  initializeApp(config);
  const db = getFirestore();

  useEffect(() => {
    // get Highscores from database
  }, [])

  return (
    <div>
      <Header />
        <div>{boardName}</div>
        <div>Highscores</div>
        <div id = {styles.HighscoresContainer}>
          {
            <div id = {styles.Highscore}>
              <div>Place</div>
              <div>Name</div>
              <div>Time</div>
            </div>
          }
        </div>
    </div>
  )
}

export default Highscores;
