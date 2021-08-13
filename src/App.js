import React, { useState, useEffect } from 'react';
import Header from './components/header';
import { checkClick } from './firebase';
import gameboard from './img/pallet-town-on-parade-crop.jpg';
import pokeball from './img/pokeball.svg';
import './styles/App.css';

// Ideas:
//  - Name As Camo Kabutops (?) OR Pallet Town On Parade
//  - Logo with Kabutops popping out of O with 3D effect -> arms behind letter, face infront
//  - Need to find Kabutops + 2 random pokemon
// 'Welcome to Pallet Towns annual parade/Safari Zone where you can catch pokemon. This year we have selected 3 pokemon for you the catch. How fast can you find and catch them?! Make sure to aim at the center of the pokemon for the best chance of a catch!'
//  - React Router -> Game, leaderboard (?)
//  - Page 1 -> 'Try to find kabutops and friends'. Include pictures of kabutops and selected random pokemon
//  - Page 2 -> Picture. Make targeting circle look like pokeball (?)
//           -> Save coordinates of the center of each pokemon in database, check if pokeball is covering that spot
//           -> Red Pokeball center for wrong, green for correct (?)
//  - Page 3 -> Leaderboards. Display users time & ask if they want to be included in the leaderboards.
//           -> Display leaderboards after question. Include what random pokemon user got

function App() {
  const [pokeballStyles, setPokeballStyles] = useState({
    top: 0,
    left: 0,
    opacity: 0,
  });

  const [displayInstructions, setDisplayInstructions] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const [randomPokemon1, setRandomPokemon1] = useState(undefined);
  const [randomPokemon2, setRandomPokemon2] = useState(undefined);
  const [remainingPokemon, setRemainingPokemon] = useState(undefined);

  const startGame = () => {
    setDisplayInstructions(false);
    setRemainingPokemon(['kabutops', randomPokemon1, randomPokemon2]);

    // Set up a firebase game session. Include Pokemon & time start
  };

  const handleGameClick = (e) => {
    const frame = document.getElementById('gameboard');

    const widthDifference = frame.width / 1347;
    const heightDifference = frame.height / 959;

    const mouseX = Math.round((e.pageX - frame.offsetLeft) / widthDifference);

    const mouseY = Math.round(
      (e.nativeEvent.pageY -
        document.querySelector('header').offsetHeight -
        document.querySelector('.remaining').offsetHeight) /
        heightDifference
    );

    console.log(mouseX, mouseY);

    const pokeballImg = document.querySelector('.pokeball');
    setPokeballStyles({
      top: e.pageY - pokeballImg.height / 2,
      left: e.pageX - pokeballImg.width / 2,
      opacity: 100,
    });

    checkClick(
      mouseX,
      mouseY,
      pokeballImg.height,
      pokeballImg.width,
      remainingPokemon
    ).then((result) => {
      console.log('Clicked Pokemon: ' + JSON.stringify(result));
      if (typeof result === 'object') {
        const tempRemainingPokemon = [...remainingPokemon];
        const foundPokemonIndex = remainingPokemon.indexOf(result.name);
        tempRemainingPokemon.splice(foundPokemonIndex, 1);
        tempRemainingPokemon.length > 0
          ? setRemainingPokemon(tempRemainingPokemon)
          : setGameOver(true);
      }
    });
  };

  useEffect(() => {
    let availablePokemon = [
      'ditto',
      'pikachu',
      'magnemite',
      'gengar',
      'diglett',
      'mr_mime',
      'persian',
      'eevee',
    ];

    const randomNumber1 = Math.floor(Math.random() * availablePokemon.length);
    setRandomPokemon1(availablePokemon[randomNumber1]);

    availablePokemon.splice(randomNumber1, 1);

    const randomNumber2 = Math.floor(Math.random() * availablePokemon.length);
    setRandomPokemon2(availablePokemon[randomNumber2]);
  }, []);

  if (displayInstructions) {
    return (
      <div className='App'>
        <Header />
        <p>How fast can you catch Kabutops and his friends?</p>
        <p>Who to catch:</p>
        <img
          className='hidden-pokemon'
          src={`../hidden-pokemon/kabutops.svg`}
          alt='Kabutops'
        />
        <img
          className='hidden-pokemon'
          src={`../hidden-pokemon/${randomPokemon1}.svg`}
          alt={randomPokemon1}
        />
        <img
          className='hidden-pokemon'
          src={`../hidden-pokemon/${randomPokemon2}.svg`}
          alt={randomPokemon2}
        />
        <button className='start' onClick={startGame}>
          Start Game
        </button>
      </div>
    );
  } else if (!gameOver) {
    return (
      <div className='App'>
        <Header />
        <div className='remaining'>
          {remainingPokemon.map((pokemon) => {
            return (
              <img
                key={pokemon}
                className='hidden-pokemon'
                src={`../hidden-pokemon/${pokemon}.svg`}
                alt={pokemon}
              />
            );
          })}
        </div>

        <img
          className='pokeball'
          src={pokeball}
          alt='Targeting Pokeball'
          style={pokeballStyles}
        />

        <img
          onClick={(e) => handleGameClick(e)}
          id='gameboard'
          src={gameboard}
          alt='Gameboard'
        />
      </div>
    );
  } else {
    return (
      <div className='App'>
        <Header />
        <div>Game Over</div>
        {/* <Leaderboards/> */}
      </div>
    );
  }
}

export default App;
