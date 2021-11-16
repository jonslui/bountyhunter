import React, {useState, useEffect} from 'react';
import styles from './Game.module.css'

const Game = (props) => {
  const [sourceImage, setSourceImage] = useState();
  const [selectedCoords, setSelectedCoords] = useState();

  useEffect(() => {
    setSourceImage(
      {
        width: 1920,
        height: 2715,
        targets: [
          {
            name: 'Bowser',
            x: 907,
            y: 1040,
          },
          {
            name: 'Jake',
            x: 278,
            y: 1387,
          },
          {
            name: 'Tottoro',
            x: 1365,
            y: 1484,
          }
        ],
      }
    );
  }, [])

  function onSelect(event){
    const [x,y] = [event.pageX, event.pageY];
    const [sourceX, sourceY] = convertCoords(x, y);

    if (areValidCoords(sourceX, sourceY)){
      showTargetSelector(x, y);
      showChoices(x, y);
      setSelectedCoords([sourceX, sourceY]);
    }
  }

  function areValidCoords(x, y){
    return x > 0 && x < 1920 && y > 0 && y < 2715 ? true : false;
  }

  function showTargetSelector(x, y) {
    let selector = document.getElementById(styles.targetSelector);
    selector.style.top = `${y - (document.documentElement.clientWidth * 4/100)}px`;
    selector.style.left = `${x - (document.documentElement.clientWidth * 4/100)}px`;
    selector.style.display = 'block';
    selector.style.position = 'absolute';
  }

  function showChoices(x, y){
    let choices = document.getElementById(styles.targetChoices);
    choices.style.top = `${y - (document.documentElement.clientWidth * 4/100)}px`;
    choices.style.left = `${x + (document.documentElement.clientWidth * 5/100)}px`;
    choices.style.display = 'grid';
    choices.style.position = 'absolute';
  }

  function onChoiceSelection(){
    console.log('Selected Coord: ' + selectedCoords);
  }


  function convertCoords(x, y) {
    let DOMRectObject = document.getElementById(styles.image).getBoundingClientRect();
    const browserImage = {
      width: DOMRectObject.width,
      height: DOMRectObject.height,
      xOffset: window.pageXOffset + DOMRectObject.left,
      yOffset: window.pageYOffset + DOMRectObject.top
    }
  
    let widthConvertor = sourceImage.width/browserImage.width;
    let heightConvertor = sourceImage.height/browserImage.height;

    return [(x - browserImage.xOffset) * widthConvertor, (y - browserImage.yOffset) * heightConvertor];
  }

  function selectorContains(character, clickedCoords){

  }


  return (
    <div>
      <div className = {styles.imageContainer}>
        <img 
            id = {styles.image}
            src = './assets/universe-113.jpeg' 
            alt = 'Universe 113'
            onClick = {(event) => {
              onSelect(event);
            }}
        />
          
        <div id = {styles.targetSelector} 
          onClick = {(event) => {
            onSelect(event);
          }}
        />

        <div id = {styles.targetChoices}>
          <input className = 'choice' type = 'submit' value = 'Choice 1' onClick = {() => {onChoiceSelection();}}/>
          <input className = 'choice' type = 'submit' value = 'Choice 2' onClick = {() => {onChoiceSelection();}}/>
          <input className = 'choice' type = 'submit' value = 'Choice 3' onClick = {() => {onChoiceSelection();}}/>
        </div>
      </div>
    </div>
    
  )
}

export default Game;