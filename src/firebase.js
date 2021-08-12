import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyAeqwNXZKfTkNi8zXI-Sk-gDMGAuLv5HTA',
  authDomain: 'wheres-waldo-c710d.firebaseapp.com',
  projectId: 'wheres-waldo-c710d',
  storageBucket: 'wheres-waldo-c710d.appspot.com',
  messagingSenderId: '323021756225',
  appId: '1:323021756225:web:fe289f8025376aeb0973c0',
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// export const initGame = (pokemon1, pokemon2) => {
//   return firebase.firestore.collection('game');
// };

export const checkClick = (
  x,
  y,
  pokeballHeight,
  pokeballWidth,
  remainingPokemon
) => {
  const pokeballLeft = x - pokeballWidth / 2;
  const pokeballRight = x + pokeballWidth / 2;
  const pokeballTop = y - pokeballHeight / 2;
  const pokeballBottom = y + pokeballHeight / 2;

  const pokemonData = [];

  return firebase
    .firestore()
    .collection('pokemon-locations')
    .where(firebase.firestore.FieldPath.documentId(), 'in', remainingPokemon)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((pokemon) => {
        pokemonData.unshift(pokemon.data());
      });

      return pokemonData.find(
        (pokemon) =>
          pokemon.location[0] > pokeballLeft &&
          pokemon.location[0] < pokeballRight &&
          pokemon.location[1] > pokeballTop &&
          pokemon.location[1] < pokeballBottom
      );
    })
    .catch((err) => console.log(err));
};

// export const addUserToLeaderboard = (name, pokemon1, pokemon2) => {
//   return firebase
//     .firestore()
//     .collection('leaderboards')
//     .doc(name)
//     .set(
//       {
//         name: name,
//         pokemon: ['kabutops', pokemon1, pokemon2],
// time: game start time - game end time
//       },
//       { merge: true }
//     );
// };
