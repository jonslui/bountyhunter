import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gameboard from './Gameboard';
import Main from './Main';
import Highscores from './Highscores';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/bountyhunter/game' element = {<Gameboard />} />
        <Route exact path = '/bountyhunter/highscores' element = {<Highscores />} />
        <Route exact path = '/bountyhunter/' element = {<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;