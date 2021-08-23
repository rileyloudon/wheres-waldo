const Instructions = (props) => {
  const { loadingPokemon, remainingPokemon, startGame } = props;

  return (
    <>
      <p>Welcome to Pallet Town's annual parade! </p>
      <p>This year we have selected the following Pokemon for you to catch:</p>
      {!loadingPokemon &&
        remainingPokemon.map((pokemonName) => {
          return (
            <img
              key={pokemonName}
              className='hidden-pokemon'
              src={`../hidden-pokemon/${pokemonName}.svg`}
              alt={pokemonName}
            />
          );
        })}
      <dl>
        <dt>How to play:</dt>
        <dd>1. Click on the map to throw a Pokeball</dd>
        <dd>2. Aim for the center of each Pokemon</dd>
        <dd>3. Catch 'em all as fast as you can to be added to the leaderboards</dd>
        <dd>Have Fun!</dd>
      </dl>
      <button className='start' onClick={startGame}>
        Start Game
      </button>
    </>
  );
};

export default Instructions;
