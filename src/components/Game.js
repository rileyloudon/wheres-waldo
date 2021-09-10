import React, { useState, useEffect } from 'react';
import {
  anonSignIn,
  checkClick,
  initGame,
  endGame,
  getUserData,
  deleteGameSession,
} from '../firebase';
import Instructions from './Instructions';
import Gameboard from './Gameboard';
import GameOver from './GameOver';

const Game = () => {
  const [pokeballStyles, setPokeballStyles] = useState({
    top: 0,
    left: 0,
    opacity: 0,
  });

  const [displayInstructions, setDisplayInstructions] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const [loadingPokemon, setLoadingPokemon] = useState(true);
  const [remainingPokemon, setRemainingPokemon] = useState();

  const [userTime, setUserTime] = useState(0);
  const [userPokemon, setUserPokemon] = useState([]);

  const startGame = () => {
    setDisplayInstructions(false);

    anonSignIn().then(() => {
      initGame(remainingPokemon);
    });
  };

  const handleGameClick = (e) => {
    const frame = document.getElementById('gameboard');

    // Gameboard/frame max size is 1347x959
    const widthDifference = frame.width / 1347;
    const heightDifference = frame.height / 959;

    const mouseX = Math.round((e.pageX - frame.offsetLeft) / widthDifference);

    const mouseY = Math.round(
      (e.pageY -
        document.querySelector('header').offsetHeight -
        document.querySelector('.remaining').offsetHeight) /
        heightDifference
    );

    const pokeballImg = document.querySelector('.pokeball');
    setPokeballStyles({
      top: e.pageY - pokeballImg.height / 2,
      left: e.pageX - pokeballImg.width / 2,
      opacity: 100,
    });

    // Due to large size difference on mobile, pokeball edges use a larger value
    // to help make sure pokeball is accurate
    const pokeballLeft =
      frame.width > 500
        ? mouseX - pokeballImg.width / 2
        : mouseX - pokeballImg.width;
    const pokeballRight =
      frame.width > 500
        ? mouseX + pokeballImg.width / 2
        : mouseX + pokeballImg.width;
    const pokeballTop =
      frame.height > 500
        ? mouseY - pokeballImg.height / 2
        : mouseY - pokeballImg.height;
    const pokeballBottom =
      frame.height > 500
        ? mouseY + pokeballImg.height / 2
        : mouseY + pokeballImg.height;

    checkClick(
      pokeballLeft,
      pokeballRight,
      pokeballTop,
      pokeballBottom,
      remainingPokemon
    ).then((result) => {
      if (typeof result === 'object') {
        const tempRemainingPokemon = [...remainingPokemon];
        const foundPokemonIndex = remainingPokemon.indexOf(result.name);
        tempRemainingPokemon.splice(foundPokemonIndex, 1);
        if (tempRemainingPokemon.length > 0)
          setRemainingPokemon(tempRemainingPokemon);
        else {
          endGame().then(() => {
            getUserData()
              .then((result) => {
                setUserTime(result.endTime - result.startTime);
                setUserPokemon(result.pokemon);
              })
              .then(() => deleteGameSession());
          });

          setGameOver(true);
        }
      }
    });
  };

  useEffect(() => {
    let availablePokemon = [
      'kabutops',
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
    const pokemon1 = availablePokemon[randomNumber1];
    availablePokemon.splice(randomNumber1, 1);

    const randomNumber2 = Math.floor(Math.random() * availablePokemon.length);
    const pokemon2 = availablePokemon[randomNumber2];
    availablePokemon.splice(randomNumber2, 1);

    const randomNumber3 = Math.floor(Math.random() * availablePokemon.length);
    const pokemon3 = availablePokemon[randomNumber3];

    setRemainingPokemon([pokemon1, pokemon2, pokemon3]);
    setLoadingPokemon(false);
  }, []);

  if (displayInstructions) {
    return (
      <Instructions
        loadingPokemon={loadingPokemon}
        remainingPokemon={remainingPokemon}
        startGame={startGame}
      />
    );
  } else if (!gameOver) {
    return (
      <Gameboard
        remainingPokemon={remainingPokemon}
        pokeballStyles={pokeballStyles}
        handleGameClick={handleGameClick}
      />
    );
  } else {
    return <GameOver userTime={userTime} userPokemon={userPokemon} />;
  }
};

export default Game;
