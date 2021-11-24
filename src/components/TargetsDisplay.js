import React from 'react';
import styles from './styles/TargetsDisplay.module.css'
import uniqid from 'uniqid';

const TargetsDisplay = (props) => {
  function showTargets(){
    let targetImages = document.getElementById(styles.targetImages);
    let dropdownTitle = document.getElementById(styles.dropdownTitle);

    if (targetImages.style.display === 'none'){
      targetImages.style.display = 'block'
      dropdownTitle.textContent = 'Targets ∧'
    } else {
      targetImages.style.display = 'none';
      dropdownTitle.textContent = 'Targets ∨'
    } 
  }

  return (
      <div id = {styles.dropDownContainer} onClick = {() => {showTargets()}}>
          <div id = {styles.dropdownTitle} >Targets ∨</div>

          <div id = {styles.targetImages} style = {{'display' : 'none'}}>
            <div id = {styles.targetImagesContainer}>
              {
                props.targetData.map((target, index) => {
                  return (
                    <div className = {styles.targetInfoContainer} key = {uniqid()}>
                      <img id = {'target' + index} className = {styles.targetImage} src = {target.src} alt = {target.name} />
                      <div>{target.name}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
      </div>
  )
}

export default TargetsDisplay;