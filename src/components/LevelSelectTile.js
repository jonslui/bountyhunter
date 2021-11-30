import React from 'react';
import {Link} from 'react-router-dom';
import styles from './styles/LevelSelectTile.module.css';

const LevelSelectTile = (props) => {
  return (
    <div className = {styles.levelSelectTile}>
        <Link to = '/bountyhunter/game' state = {{ levelData: props.levelData}}>
          <div className = {styles.levelTitle}>
            {props.levelData.alt}
          </div>
      
          <div className = {styles.levelPreviewImageContainer}>
              <img className = {styles.levelPreviewImage} src = { props.levelData.alt === 'The Loc Nar' ? '/assets/the-loc-nar-preview.jpeg' : props.levelData.src} alt = {props.levelData.alt}/>
          </div>
        </Link>
      
        <Link to = '/bountyhunter/game' state = {{ levelData: props.levelData}}>
          <button className = {styles.levelSelectButton}>Play Game</button>
        </Link>

        <Link to = '/bountyhunter/highscores' state = {{ boardName: props.levelData.alt}}>
          <button className = {styles.levelSelectButton}>Highscores</button>
        </Link>
    </div>
  )
}

export default LevelSelectTile;