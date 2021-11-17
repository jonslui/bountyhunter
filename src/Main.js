import React from 'react';
import LevelSelectTile from './components/LevelSelectTile';
import Header from './components/Header';
import styles from './Main.module.css';
import uniqid from 'uniqid';

const Main = () => {
  const levels = [
    {
      src: '/assets/universe-113.jpeg',
      alt: 'Universe 113',
      width: 1920,
      height: 2715,
      targets: [
        {
          name: 'Bowser',
          src: '/assets/Bowser.jpeg',
          x: 900,
          y: 1011,
        },
        {
          name: 'Finn and Jake',
          src: '/assets/Finn-and-Jake.jpeg',
          x: 278,
          y: 1387,
        },
        {
          name: 'Guts',
          src: '/assets/Guts.jpeg',
          x: 919,
          y: 2453,
        }
      ]
    },
    {
      src: '/assets/the-loc-nar.jpeg',
      alt: 'The Loc Nar',
      width: 2000,
      height: 8422,
      targets: [
        {
          name: 'TBD',
          src: '',
          x: 0,
          y: 0,
        },
        {
          name: 'TBD',
          src: '',
          x: 0,
          y: 0,
        },
        {
          name: 'TBD',
          src: '',
          x: 0,
          y: 0,
        }
      ]
    }
  ];

  return (
    <div>
      <Header />
      <div className = { styles.selectorContainer } >
        {
          levels.map((levelData, index) => {
            return <LevelSelectTile key = {uniqid()} levelData = {levelData} />
          })
        }
      </div>
    </div>

  )
}

export default Main;