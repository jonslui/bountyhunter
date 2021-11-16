import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
      <header className= {styles.header}>
        <Link to = '/wheres-waldo/' style = {{color: '#FFF'}}>Where's Waldo</Link>
      </header>
  )
}

export default Header;
