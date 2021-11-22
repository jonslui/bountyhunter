import React from 'react';
import styles from './styles/TargetsDisplay.module.css'
import uniqid from 'uniqid';

const TargetsDisplay = (props) => {
  function showTargets(){
    let targetImages = document.getElementById(styles.targetImages);
    let targetsTitle = document.getElementById(styles.targetsTitle);

    if (targetImages.style.display === 'none'){
      targetImages.style.display = 'block'
      targetsTitle.textContent = 'Targets ∧'
    } else {
      targetImages.style.display = 'none';
      targetsTitle.textContent = 'Targets ∨'
    } 
  }

  return (
      <div id = {styles.targetsContainer} onClick = {() => {showTargets()}}>
          <div id = {styles.targetsTitle} >Targets ∨</div>

          <div id = {styles.targetImages} style = {{'display' : 'none'}}>
            {
              props.targetData.map((target, index) => {
                return (
                    <img id = {'target' + index} className = {styles.targetImage} src = {target.src} alt = {target.name} key = {uniqid()}/>
                )
              })
            }
          </div>
      </div>
  )
}

export default TargetsDisplay;