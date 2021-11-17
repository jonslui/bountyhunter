import React, {useState, useEffect} from 'react';
import styles from './Game.module.css';
import Header from './components/Header';
import TargetsDisplay from './components/TargetsDisplay';

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
            x: 900,
            y: 1011,
          },
          {
            name: 'Finn and Jake',
            x: 278,
            y: 1387,
          },
          {
            name: 'Guts',
            x: 919,
            y: 2453,
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

  function onChoiceSelection(id){
    console.log('Selected Coord: ' + selectedCoords);
    selectorContains(id);
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

  function selectorContains(id){
    if (selectedCoords[0] >= (sourceImage.targets[id].x - 50) 
      && selectedCoords[0] <= (sourceImage.targets[id].x + 50)
      && selectedCoords[1] >= (sourceImage.targets[id].y - 50)
      && selectedCoords[1] <= (sourceImage.targets[id].y) + 50){

      console.log(sourceImage.targets[id].name + ' hit!');
    }
  }


  return (
    <div>   
      <Header />
      
      <TargetsDisplay />

      <div className = {styles.imageContainer}>
        <img 
            id = {styles.image}
            src = '/assets/universe-113.jpeg' 
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

        {
          sourceImage ? (
            <div id = {styles.targetChoices}>
              <input className = 'choice' type = 'submit' value = {sourceImage.targets[0].name} onClick = {() => {onChoiceSelection(0);}}/>
              <input className = 'choice' type = 'submit' value = {sourceImage.targets[1].name} onClick = {() => {onChoiceSelection(1);}}/>
              <input className = 'choice' type = 'submit' value = {sourceImage.targets[2].name} onClick = {() => {onChoiceSelection(2);}}/>
            </div>
          ) : null
        }
          
      </div>
    </div>
    
  )
}

export default Game;