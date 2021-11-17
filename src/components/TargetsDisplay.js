import React from 'react';
import styles from './styles/TargetsDisplay.module.css'

const TargetsDisplay = () => {
  function showTargets(){
    let targetImages = document.getElementById(styles.targetImages);
    let targetsTitle = document.getElementById(styles.targetsTitle);

    if (targetImages.style.display === 'none'){
      targetImages.style.display = 'block'
      targetsTitle.textContent = 'Targets ▲'
    } else {
      targetImages.style.display = 'none';
      targetsTitle.textContent = 'Targets ▼'
    } 
  }

  return (
      <div id = {styles.targetsContainer} onClick = {() => {showTargets()}}>
          <div id = {styles.targetsTitle} >Targets ▼</div>

          <div id = {styles.targetImages} style = {{'display' : 'none'}}>
            <img className = {styles.targetImage} src = '/assets/Bowser.jpeg' alt = 'Target 1' />
            <img className = {styles.targetImage} src = '/assets/Finn-and-Jake.jpeg' alt = 'Target 2' />
            <img className = {styles.targetImage} src = '/assets/Guts.jpeg' alt = 'Target 3' />
          </div>
      </div>
  )
}

export default TargetsDisplay;