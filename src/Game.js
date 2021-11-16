import React, {useState, useEffect} from 'react';
import styles from './Game.module.css'

const Game = (props) => {
  const [sourceImage, setSourceImage] = useState();

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


  function showSelector() {
  }

  function convertCoords(event) {
    let DOMRectObject = event.target.getBoundingClientRect();
    const browserImage = {
      width: DOMRectObject.width,
      height: DOMRectObject.height,
      xOffset: window.pageXOffset + DOMRectObject.left,
      yOffset: window.pageYOffset + DOMRectObject.top
    }
  
    let widthConvertor = sourceImage.width/browserImage.width;
    let heightConvertor = sourceImage.height/browserImage.height;
    let clickedX = event.pageX;
    let clickedY = event.pageY;

    console.log('Clicked: (' + (clickedX - browserImage.xOffset) * widthConvertor + ', ' + (clickedY - browserImage.yOffset) * heightConvertor + ')');
  }

  function selectorContains(character, clickedCoords){

  }


  return (
    <div className = {styles.imageContainer}>
      <img 
        className = {styles.image}
        src = './assets/universe-113.jpeg' 
        alt = 'Universe 113'
        onClick = {(event) => {
          convertCoords(event);
        }}
      />
      <div id = {styles.selector} />
    </div>
  )
}

export default Game;