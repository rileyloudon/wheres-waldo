import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { addToLeaderboards } from '../firebase';

const GameOver = (props) => {
  const { userTime, userPokemon } = props;
  const history = useHistory();

  const [askName, setAskName] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <h2>Congratulations!</h2>
      <p>You found everyone in {userTime.toFixed(2)} seconds!</p>
      <p>Would you like to be added to the leaderboard?</p>
      {!askName ? (
        <>
          <button className='noBtn' onClick={() => history.push('/leaderboards')}>
            No
          </button>
          <button className='yesBtn' onClick={() => setAskName(true)}>
            Yes
          </button>
        </>
      ) : (
        <>
          <label className='name-input'>
            Whats your name?
            <input
              placeholder='Ash'
              type='text'
              value={name}
              maxLength='12'
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button
            className='cancelBtn'
            onClick={() => history.push('/leaderboards')}
          >
            Cancel
          </button>
          <button
            className='addBtn'
            onClick={() => {
              history.push('/leaderboards');
              addToLeaderboards(name, userPokemon, userTime);
            }}
          >
            Add
          </button>
        </>
      )}
    </>
  );
};

export default GameOver;
