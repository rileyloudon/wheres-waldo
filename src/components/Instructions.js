const Instructions = (props) => {
  const { loadingPokemon, pokemon, startGame } = props;

  return (
    <>
      <p>Welcome to Pallet Town's annual parade! </p>
      <p>This year we have selected a few Pokemon for you to catch.</p>
      <p>Who to catch:</p>
      <div>
        {!loadingPokemon &&
          pokemon.map((pokemonName) => {
            return (
              <img
                key={pokemonName}
                className='hidden-pokemon'
                src={`../hidden-pokemon/${pokemonName}.svg`}
                alt={pokemonName}
              />
            );
          })}
      </div>
      <dl>
        <dt>How to play:</dt>
        <dd>Click on the map to throw a Pokeball</dd>
        <dd>Aim for the center of each Pokemon</dd>
        <dd>Catch them all as fast as you can to be added to the leaderboards</dd>
        <dd>Have Fun!</dd>
      </dl>
      <button className='start' onClick={startGame}>
        Start Game
      </button>
    </>
  );
};

export default Instructions;
