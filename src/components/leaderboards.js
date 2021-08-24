import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { anonSignIn, currentUser } from '../firebase';
import '../styles/Leaderboards.css';

const Leaderboards = () => {
  const [allLeaderboards, setAllLeaderboards] = useState([]);
  const [top10, setTop10] = useState([]);
  const [currentUserBestRank, setCurrentUserBestRank] = useState();
  const [currentUserBest, setCurrentUserBest] = useState();
  const [player, setPlayer] = useState(currentUser());

  if (!player) anonSignIn().then(() => setPlayer(currentUser()));

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('leaderboards')
      .orderBy('time', 'asc')
      .onSnapshot((querySnapshot) => {
        const leaderboardData = [];
        querySnapshot.forEach((user) => {
          leaderboardData.push(user.data());
        });
        setAllLeaderboards(leaderboardData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setTop10(allLeaderboards.slice(0, 10));
    if (player) {
      const userIndex = allLeaderboards.findIndex(
        (person) => person.id === player.uid
      );
      setCurrentUserBest(allLeaderboards[userIndex]);
      setCurrentUserBestRank(userIndex);
    }
  }, [allLeaderboards, player]);

  const displayUser = (user, i) => {
    return (
      <tr
        key={user.name + user.time}
        className={i > 10 || user === currentUserBest ? 'user-best' : null}
      >
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

  return (
    <div id='leaderboards'>
      <h2>Leaderboards</h2>
      {currentUserBestRank < 10 && currentUserBestRank !== -1 && (
        <p className='user-best'>Your Best Time</p>
      )}
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
      {currentUserBestRank > 10 && (
        <table>
          <thead>
            <tr>
              <th colSpan='4'>Your Best Time</th>
            </tr>
          </thead>
          <tbody className='leaderboard-entry'>
            {displayUser(currentUserBest, currentUserBestRank, true)}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboards;
