import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Game from './components/Game';
import Leaderboards from './components/Leaderboards';
import './styles/App.css';

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
