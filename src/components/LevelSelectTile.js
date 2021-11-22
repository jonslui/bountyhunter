import React from 'react';
import {Link} from 'react-router-dom';
import styles from './styles/LevelSelectTile.module.css';

const LevelSelectTile = (props) => {
  return (
    <div className = {styles.levelSelectTile}>
      <Link to = '/wheres-waldo/game' state = {{ levelData: props.levelData}}>
        {props.levelData.alt}
        <div className = {styles.levelPreviewImageContainer}>
          <img className = {styles.levelPreviewImage} src = { props.levelData.alt === 'The Loc Nar' ? '/assets/the-loc-nar-preview.jpeg' : props.levelData.src} alt = {props.levelData.alt}/>
        </div>

        <button className = {styles.levelSelectButton}>Play Game</button>
      </Link>
      <Link to = '/wheres-waldo/highscores' state = {{ boardName: props.levelData.alt}}>
        <button>Highscores</button>
      </Link>
    </div>
  )
}

export default LevelSelectTile;