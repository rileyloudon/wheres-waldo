import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
// import { loadLeaderboards } from '../firebase';

const Leaderboards = () => {
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('leaderboards')
      .orderBy('time', 'asc')
      .limit(10)
      .onSnapshot((querySnapshot) => {
        const leaderboardData = [];
        querySnapshot.forEach((user) => {
          leaderboardData.push(user.data());
        });
        setTop10(leaderboardData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const displayUser = (user, i) => {
    return (
      <tr key={user.name + user.time}>
        <td className='rank'>{i + 1}. </td>
        <td className='name'>{user.name}</td>
        <td className='pokemon'>
          {user.pokemon[0]},{' '}
          {user.pokemon[1] !== 'mr_mime' ? user.pokemon[1] : 'Mr. Mime'},{' '}
          {user.pokemon[2] !== 'mr_mime' ? user.pokemon[2] : 'Mr. Mime'},
        </td>
        <td className='time'>{user.time.toFixed(2)}s</td>
      </tr>
    );
  };

  // If user just played and is over rank 10, display their rank

  return (
    <div id='leaderboards'>
      <h2>Leaderboards</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Pokemon Caught</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody className='leaderboard-entry'>
          {top10.map((user, i) => displayUser(user, i))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboards;
