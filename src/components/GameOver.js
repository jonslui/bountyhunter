import React, { useEffect, useState } from 'react';
import { getFirebaseConfig } from '../firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/GameOver.module.css';

const GameOver = (props) => {
  const [popUp, setPopUp] = useState();
  let navigate = useNavigate();


  const config = getFirebaseConfig();
  initializeApp(config);
  const db = getFirestore();

  useEffect(() => {
    checkForHighscoreAndSetState();
  }, []);


  async function checkForHighscoreAndSetState(){
    const playerTime = await getPlayerTime();
    const rankings = await getRankings()
    const lastPlaceTime = rankings[rankings.length - 1].time;

    if (playerTime < lastPlaceTime) {
      setPopUp(highScorePopUp(playerTime));      
    } else {
      setPopUp(noHighScorePopUp(playerTime));
    }
  }

  async function getPlayerTime() {
    try {
      const userRef = doc(db, 'users', getAuth().currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      return (userData.endTime - userData.startTime);
    } catch (error) {
      console.error(error);
    }
  }

  async function getRankings() {
    try {
      const docRef = doc(db, 'highscores', props.boardName);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      return docData.rankings;
    } catch (error) {
      console.error(error);
    }
  }

  // setTimeout here gives database time update Highscores before navigating to highscores page
  const highScorePopUp = (numberOfSeconds) => {
    return (
      <div id = {styles.container}>
        <header>You got a highscore!</header>
        <div>{numberOfSeconds} Seconds!</div>
        <p>Enter your name to save your score</p>
        <input id = { styles.nameInput } type = 'text' placeholder = 'Type your name here!'/>
        <button onClick = {() => {
          onSubmitScore();
          setTimeout(() => {
            navigate('/bountyhunter/highscores', { state: {'boardName': props.boardName}})
          }, 500)
        }}>Submit</button> 
      </div>
    )
  }

  const noHighScorePopUp = (numberOfSeconds) => {
    return (
      <div id = {styles.container}>
        <header>Congratulations!</header>
        <div>{numberOfSeconds} Seconds!</div>
        <button onClick = {() => {
          navigate('/bountyhunter/highscores', { state: {'boardName': props.boardName}})}
        }>View Highscores</button> 

        <button onClick = {() => {
          navigate('/bountyhunter/');
        }}>Home</button> 
      </div>
    )
  }
  
  function onSubmitScore() {
    const name = document.getElementById(styles.nameInput).value;
    if (name) {
      updateHighscores(name);
    } else {
      updateHighscores('Anonymous')
    }
  }

  async function updateHighscores(name) {
    try {
      const originalRankings = await getRankings();
      const playerTime = await getPlayerTime();
      const newRankings = originalRankings
        .concat({
          name: name,
          time: playerTime,
        })
        .sort((a, b) => {
          if (a.time > b.time) {
            return 1
          }
          if (a.time < b.time) {
            return -1;
          }
          return 0;
        })
        .slice(0, -1);
        
      await setDoc((doc(db, 'highscores', props.boardName)), {
        rankings: newRankings,
      });

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <Link to = '/bountyhunter/'>
        <div id = {styles.pageOverlay}/>
      </Link>

      {
       popUp
      }
    </div>
  )
}

export default GameOver;
