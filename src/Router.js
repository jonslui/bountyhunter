import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gameboard from './Gameboard';
import Main from './Main';
import Highscores from './Highscores';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/wheres-waldo/game' element = {<Gameboard />} />
        <Route exact path = '/wheres-waldo/highscores' element = {<Highscores />} />
        <Route exact path = '/wheres-waldo/' element = {<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;