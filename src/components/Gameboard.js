import map from '../img/pallet-town-on-parade-gameboard.jpg';
import pokeball from '../img/pokeball.svg';

const Gameboard = (props) => {
  const { remainingPokemon, pokeballStyles, handleGameClick } = props;

  return (
    <>
      <div className='remaining'>
        {remainingPokemon.map((pokemon) => {
          return (
            <img
              key={pokemon}
              className='hidden-pokemon'
              src={`img/hidden-pokemon/${pokemon}.svg`}
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
        src={map}
        alt='Gameboard'
      />
    </>
  );
};

export default Gameboard;
