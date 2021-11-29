import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, updateDoc, Timestamp} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import styles from './Gameboard.module.css';
import Header from './components/Header';
import TargetsDisplay from './components/TargetsDisplay';
import GameOver from './components/GameOver';
import uniqid from 'uniqid';

const Game = () => {
  const [selectedCoords, setSelectedCoords] = useState();
  const [hitTargets, setHitTargets] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const levelData = location.state ? location.state.levelData : '';

  const config = getFirebaseConfig();
  initializeApp(config);
  const db = getFirestore();

  useEffect(() => {
    // Timestamp is set on serverside when a game is loaded, this is then used to calculate game length on finished game.
    async function setTimestamp() {
      try {
        const userRef = doc(db, 'users', getAuth().currentUser.uid);
        await setDoc(userRef, {
          startTime: Timestamp.now().seconds,
        })
      } catch (error) {
        console.error(error);
      }
    }

    // If user enters this '/wheres-waldo/game into search bar, return them to homepage so they can choose a level
    if (!levelData){
      navigate('/wheres-waldo/');
    }

    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        setTimestamp();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode);
      });
  }, []);



  // X and Y here are the coords of the mouse click,
  // sourceX and sourceY are the location of this click on the original image resolution.
  function onSelect(event){
    const [x,y] = [event.pageX, event.pageY];
    const [sourceX, sourceY] = convertCoords(x, y);

    if (areValidCoords(sourceX, sourceY)){
      showTargetSelectorAndChoices(x, y);
      setSelectedCoords([sourceX, sourceY]);
    }
  }
  
  // convert Coords to where they would be on the original resolution image.
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


  // Did the mouse click happen inside the image
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

  function onChoiceSelection(targetIndex){
    const target = levelData.targets[targetIndex];
    if (selectorContains(target) && !hitTargets.includes(target.name)) {
      showFeedback(true);
      hasWon() ? onWin() : setHitTargets(hitTargets.concat(target.name));
    } else {
      showFeedback(false);
    }
    hideTargetSelectorAndChoices();
  }

  function hideTargetSelectorAndChoices(){
    let selector = document.getElementById(styles.targetSelector);
    let choices = document.getElementById(styles.targetChoices);

    selector.style.display = 'none';
    choices.style.display = 'none';
  }

  function selectorContains(target){
    if (selectedCoords[0] >= (target.x - 50) && selectedCoords[0] <= (target.x + 50)
      && selectedCoords[1] >= (target.y - 50) && selectedCoords[1] <= (target.y + 50)){
        return true;
      }
      return false;
  }

  // Screen flashes green or red based on correct/incorrect choice
  function showFeedback(isCorrectChoice){
    const resultDisplay = isCorrectChoice ? document.getElementById(styles.hit) : document.getElementById(styles.miss);
    resultDisplay.style.display = 'block';
    setTimeout(() => {
      resultDisplay.style.display = 'none';
    }, 200);
  }

  function hasWon(){
    return hitTargets.length + 1 === levelData.targets.length ? true : false;
  }

  // Timeout here gives time for the database to update before moving on
  function onWin(){
    updateDoc(doc(db, 'users', getAuth().currentUser.uid), {
      endTime: Timestamp.now().seconds,
    })
    hideTargetSelectorAndChoices();
    
    setTimeout(() => {
      setIsGameOver(true)
    }, 500)
  }


  return (
      <div>
        {
          levelData ? 
            (
              <div>
                <Header inGame = {true} isGameOver = {isGameOver} />

                <TargetsDisplay targetData = {levelData.targets} hitTargets = {hitTargets}/>

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
                        {
                          levelData.targets.map((target, index) => {
                            return (
                              hitTargets.includes(target.name) ? null : (
                                <input key = {uniqid()} className = 'choice' type = 'submit' value = {target.name} 
                                  onClick = {() => {
                                  onChoiceSelection(index);
                                }}/>
                              )
                            ) 
                          })
                        }
                      </div>
                    ) : null
                  }
                  
                </div>

                {
                  isGameOver ? <GameOver boardName = {levelData.alt} /> : null
                }

                <div id = {styles.hit} style = {{'display': 'none'}}/>
                <div id = {styles.miss} style = {{'display': 'none'}}/>
              </div>
            )
            : null
        }    
      </div>
    )
}

export default Game;