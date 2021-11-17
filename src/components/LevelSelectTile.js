import React from 'react';
import {Link} from 'react-router-dom';

const LevelSelectTile = (props) => {
  return (
    <div>
        <Link to = '/wheres-waldo/game' state = {{ levelData: props.levelData}}>Play Level</Link>
    </div>
  )
}

export default LevelSelectTile;