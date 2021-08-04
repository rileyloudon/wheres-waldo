import React, { useState, useEffect } from 'react';
import Header from './components/header';
import gameboard from './img/pallet-town-on-parade-crop.jpg';
import './styles/App.css';

// Ideas:
//  - Name As Camo Kabutops (?) OR Pallet Town On Parade
//  - Logo with Kabutops popping out of O with 3D effect -> arms behind letter, face infront
//  - Need to find Kabutops + 2 random pokemon
//  - React Router -> Game, leaderboard
//  - Page 1 -> 'Try to find kabutops and friends'. Include pictures of kabutops and selected random pokemon
//  - Page 2 -> Picture. Make targeting circle look like pokeball (?)
//           -> Save coordinates of the center of each pokemon in database, check if pokeball is covering that spot
//  - Page 3 -> Leaderboards. Display users time & ask if they want to be included in the leaderboards.
//           -> Display leaderboards after question. Include what random pokemon user got

function App() {
  const [displayInstructions, setDisplayInstructions] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const [randomPokemon1, setRandomPokemon1] = useState(undefined);
  const [randomPokemon2, setRandomPokemon2] = useState(undefined);

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

  return (
    <div className='App'>
      <Header />
      {displayInstructions ? (
        <>
          <p>How fast can you find Kabutops and his friends?</p>
          <p>Who to find:</p>
          <img
            className='hidden-pokemon'
            src={`../hidden-pokemon/kabuto.svg`}
            alt='Kabuto'
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
          <button className='start' onClick={() => setDisplayInstructions(false)}>
            Start Game
          </button>
        </>
      ) : (
        <img
          onClick={(e) => {
            const frame = document.getElementById('gameboard');
            const rect = frame.getBoundingClientRect();
            console.log(rect);

            const widthDifference = rect.width / 1347;
            const heightDifference = rect.height / 959;

            // Currently doesn't work if zoomed in with width > 1347px
            const mouseX =
              window.innerWidth > 1347
                ? Math.round((e.nativeEvent.pageX - rect.left) / widthDifference)
                : Math.round(e.nativeEvent.pageX / widthDifference);

            // 19 = height of header
            const mouseY = Math.round((e.nativeEvent.pageY - 19) / heightDifference);
            console.log(mouseX, mouseY);
          }}
          id='gameboard'
          src={gameboard}
          alt=''
        />
      )}
    </div>
  );
}

export default App;
