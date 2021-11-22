import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  useEffect(() => {
    function timerFunction() {
      setTimeout(()=> {
        setTimeInSeconds(timeInSeconds + 1)
      }, 1000) 
    }

    if (props.inGame && !props.isGameOver){
      timerFunction();
    }

    return () => {
      clearTimeout(timerFunction);
    }
  });


  return (
      <header className= {styles.header}>
        <Link to = '/wheres-waldo/' style = {{color: '#FFF'}}>Bounty Hunter</Link>
        
        {
          props.inGame ? (
          <div>{timeInSeconds}</div> 
          ) : null
          }
      </header>
  )
}

export default Header;
