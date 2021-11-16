import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Game';
import Main from './Main';

const Router = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/wheres-waldo/game' element = {<Game />} />
        <Route exact path = '/wheres-waldo/' element = {<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;