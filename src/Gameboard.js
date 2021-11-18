import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, doc, setDoc, updateDoc, Timestamp} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import styles from './Gameboard.module.css';
import Header from './components/Header';
import TargetsDisplay from './components/TargetsDisplay';
import GameOver from './components/GameOver';

const Game = () => {
  const [selectedCoords, setSelectedCoords] = useState();
  const [hits, setHits] = useState(0);
  const { levelData } = useLocation().state;

  const config = getFirebaseConfig();
  initializeApp(config);
  const db = getFirestore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, 'users', getAuth().currentUser.uid);
        await setDoc(userRef, {
          startTime: Timestamp.now().seconds,
        })
      } catch (error) {
        console.error(error);
      }
    }

    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode);
      });
  }, []);



  function onSelect(event){
    const [x,y] = [event.pageX, event.pageY];
    const [sourceX, sourceY] = convertCoords(x, y);

    if (areValidCoords(sourceX, sourceY)){
      showTargetSelectorAndChoices(x, y);
      setSelectedCoords([sourceX, sourceY]);
    }
  }
  
  function convertCoords(x, y) {
    let DOMRectObject = document.getElementById(styles.image).getBoundingClientRect();
    const browserImage = {
      width: DOMRectObject.width,
      height: DOMRectObject.height,
      xOffset: window.pageXOffset + DOMRectObject.left,
      yOffset: window.pageYOffset + DOMRectObject.top
    }

    let widthConvertor = levelData.width/browserImage.width;
    let heightConvertor = levelData.height/browserImage.height;

    return [(x - browserImage.xOffset) * widthConvertor, (y - browserImage.yOffset) * heightConvertor];
  }

  function areValidCoords(x, y){
    return x > 0 && x < levelData.width && y > 0 && y < levelData.height ? true : false;
  }

  function showTargetSelectorAndChoices(x, y){
    let selector = document.getElementById(styles.targetSelector);
    let choices = document.getElementById(styles.targetChoices);

    selector.style.top = `${y - (document.documentElement.clientWidth * 4/100)}px`;
    selector.style.left = `${x - (document.documentElement.clientWidth * 4/100)}px`;
    selector.style.display = 'block';
    selector.style.position = 'absolute';

    choices.style.top = `${y - (document.documentElement.clientWidth * 4/100)}px`;
    choices.style.left = `${x + (document.documentElement.clientWidth * 5/100)}px`;
    choices.style.display = 'grid';
    choices.style.position = 'absolute';
  }

  function hideTargetSelectorAndChoices(){
    let selector = document.getElementById(styles.targetSelector);
    let choices = document.getElementById(styles.targetChoices);

    selector.style.display = 'none';
    choices.style.display = 'none';
  }


  function onChoiceSelection(target){
    if (selectorContains(target)) {
      hasWon(hits + 1) ? onWin() : setHits(hits + 1);
    }
  }

  function selectorContains(id){
    if (selectedCoords[0] >= (levelData.targets[id].x - 50) 
      && selectedCoords[0] <= (levelData.targets[id].x + 50)
      && selectedCoords[1] >= (levelData.targets[id].y - 50)
      && selectedCoords[1] <= (levelData.targets[id].y) + 50){
        return true;
      }
      return false;
  }

  function hasWon(currentScore){
    return currentScore === 3 ? true : false;
  }

  function onWin(){
    updateDoc(doc(db, 'users', getAuth().currentUser.uid), {
      endTime: Timestamp.now().seconds,
    });
    
    hideTargetSelectorAndChoices();

    setTimeout(() => {
      setHits(hits + 1)
    }, 100)
  }


  return (
    <div>   
      <Header />
      
      <TargetsDisplay targetData = {levelData.targets}/>

      <div className = {styles.imageContainer}>
        <img 
            id = {styles.image}
            src = {levelData.src}
            alt = {levelData.alt}
            onClick = {(event) => {
              onSelect(event);
            }}
        />
          
        <div id = {styles.targetSelector} 
          onClick = {(event) => {
            onSelect(event);
          }}
        />

        {
          levelData ? (
            <div id = {styles.targetChoices}>
              <input className = 'choice' type = 'submit' value = {levelData.targets[0].name} onClick = {() => {onChoiceSelection(0);}}/>
              <input className = 'choice' type = 'submit' value = {levelData.targets[1].name} onClick = {() => {onChoiceSelection(1);}}/>
              <input className = 'choice' type = 'submit' value = {levelData.targets[2].name} onClick = {() => {onChoiceSelection(2);}}/>
            </div>
          ) : null
        }
          
      </div>
      
      {
        hits === 3 ? <GameOver boardName = {levelData.alt} /> : null
      }
      
    </div>
    
  )
}

export default Game;