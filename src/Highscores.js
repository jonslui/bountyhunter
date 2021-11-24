import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import uniqid from 'uniqid';
import Header from './components/Header';
import styles from './Highscores.module.css';

const Highscores = () => {
  const [component, setComponent] = useState();
  const state = useLocation().state;
  let boardName = state ? state.boardName : '';
  
  const config = getFirebaseConfig();
  initializeApp(config);
  const db = getFirestore();

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode);
      });
    
    checkIfBoardSelectedAndSetComponent();
  }, [])

  async function checkIfBoardSelectedAndSetComponent(){
    if (boardName) {
      const rankings = await getHighscores();
      const highscoresComponent = createHighscoresComponent(rankings)
      setComponent(highscoresComponent);
    } else {
      const chooseHighscoresComponent = createChooseHighscoresToViewComponent();
      setComponent(chooseHighscoresComponent);
    }
  }

  async function getHighscores(){
    try {
      const docRef = doc(db, 'highscores', boardName);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      return docData.rankings;
    } catch (error) {
      console.error(error);
    }
  }


  const createHighscoresComponent = (rankings) => {
    return (
      <div className = {styles.Scoreboard}>
        <div className = {styles.title} >Highscores</div>
        <div className = {styles.boardName} >{boardName}</div>
        <div id = {styles.HighscoresContainer}>
          <div className = {styles.Labels}>
            <div>Place</div>
            <div>Name</div>
            <div>Time (seconds)</div>
          </div>
          {
            rankings.map((place, index) => {
              return (
                <div className = {styles.Highscore} key = {uniqid()}>
                  <div>{index + 1}</div>
                  <div>{place.name}</div>
                  <div>{place.time}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  const createChooseHighscoresToViewComponent = () => {
    return (
      <div>
        <div className = {styles.title} style = {{'margin' : '2vh'}}>Highscores</div>

        <div className = {styles.buttonContainer}>
          <button className = {styles.selectButton} onClick = {() => {
            boardName = 'Universe 113';
            checkIfBoardSelectedAndSetComponent();
          }}>
            Universe 113
          </button>

          <button className = {styles.selectButton} onClick = {() => {
            boardName = 'The Loc Nar';
            checkIfBoardSelectedAndSetComponent();
          }}>
            The Loc Nar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
        {
          component
        }
    </div>
  )
}

export default Highscores;
