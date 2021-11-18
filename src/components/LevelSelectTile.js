import React from 'react';
import {Link} from 'react-router-dom';

const LevelSelectTile = (props) => {
  return (
    <div>
        {props.levelData.alt}
        <Link to = '/wheres-waldo/game' state = {{ levelData: props.levelData}}>Play Level</Link>
        <Link to = '/wheres-waldo/highscores' state = {{ boardName: props.levelData.alt}}>Highscores</Link>
    </div>
  )
}

export default LevelSelectTile;