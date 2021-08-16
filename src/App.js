import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Game from './components/game';
import Leaderboards from './components/leaderboards';
import './styles/App.css';

// Ideas:
//  - Name As Camo Kabutops (?) OR Pallet Town On Parade
//  - Logo with Kabutops popping out of O with 3D effect -> arms behind letter, face infront
//  - Need to find Kabutops + 2 random pokemon
// 'Welcome to Pallet Towns annual parade/Safari Zone where you can catch pokemon. This year we have selected 3 pokemon for you the catch. How fast can you find and catch them?! Make sure to aim at the center of the pokemon for the best chance of a catch!'
//  - React Router -> Game, leaderboard (?)
//  - Page 1 -> 'Try to find kabutops and friends'. Include pictures of kabutops and selected random pokemon
//  - Page 2 -> Picture. Make targeting circle look like pokeball. Animate shaking pokeball while waiting for server to check status  (?)
//           -> Save coordinates of the center of each pokemon in database, check if pokeball is covering that spot
//           -> Red Pokeball center for wrong, green for correct (?)
//  - Page 3 -> Leaderboards. Display users time & ask if they want to be included in the leaderboards.
//           -> Display leaderboards after question. Include what random pokemon user got

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className='Pallet-Town-On-Parade'>
        <Header />
        <Switch>
          <Route exact path='/' component={Game} />
          <Route exact path='/leaderboards' component={Leaderboards} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
