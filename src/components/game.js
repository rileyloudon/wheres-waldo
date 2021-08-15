import React, { useState, useEffect } from 'react';
import { anonSignIn, checkClick, initGame, endGame, getUserData } from '../firebase';
import gameboard from '../img/pallet-town-on-parade-gameboard.jpg';
import pokeball from '../img/pokeball.svg';

const Game = () => {
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

  const [userTime, setUserTime] = useState('---');

  const startGame = () => {
    setDisplayInstructions(false);
    setRemainingPokemon(['kabutops', randomPokemon1, randomPokemon2]);

    anonSignIn().then(() => {
      initGame(['kabutops', randomPokemon1, randomPokemon2]);
    });
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
        if (tempRemainingPokemon.length > 0)
          setRemainingPokemon(tempRemainingPokemon);
        else {
          endGame();
          getUserData().then((result) => {
            setUserTime((result.endTime - result.startTime).toFixed(2));
            console.log(result.endTime - result.startTime);
          });
          setGameOver(true);
        }
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
      <>
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
      </>
    );
  } else if (!gameOver) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <>
        <h2>Congratulations!</h2>
        <p>You found everyone in {userTime} seconds!</p>
        <p>Would you like to be added to the leaderboard?</p>
        <button>No</button>
        <button>Yes</button>
        {/* <Leaderboards/> */}
      </>
    );
  }
};

export default Game;