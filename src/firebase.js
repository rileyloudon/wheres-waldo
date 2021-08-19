import firebase from 'firebase/app';
import 'firebase/auth';
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

export const initGame = (pokemon) => {
  const user = firebase.auth().currentUser;
  return firebase.firestore().collection('game-sessions').doc(user.uid).set({
    pokemon: pokemon,
    startTime: firebase.firestore.Timestamp.now(),
  });
};

export const endGame = () => {
  const user = firebase.auth().currentUser;
  return firebase.firestore().collection('game-sessions').doc(user.uid).set(
    {
      endTime: firebase.firestore.Timestamp.now(),
    },
    { merge: true }
  );
};

export const deleteGameSession = () => {
  const user = firebase.auth().currentUser;
  return firebase.firestore().collection('game-sessions').doc(user.uid).delete();
};

export const getUserData = () => {
  const user = firebase.auth().currentUser;

  const docRef = firebase.firestore().collection('game-sessions').doc(user.uid);
  return docRef.get().then((doc) => {
    return doc.data();
  });
};

export const anonSignIn = () => {
  return firebase.auth().signInAnonymously();
};

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

// Load Leaderboards located in leaderboards.js -> allows for live reloading

export const addToLeaderboards = (name, pokemon, time) => {
  return firebase
    .firestore()
    .collection('leaderboards')
    .add({
      name: name || 'Ash',
      pokemon: pokemon,
      time: time,
    });
};
