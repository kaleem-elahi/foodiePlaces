import firebase from 'firebase';
// import initializePush from '../initialize';

const config = {
  apiKey: 'AIzaSyC8Vlex1qpiaE_7eceAANTgLVtORc_ELZo',
  authDomain: 'foodieplaces-3311d.firebaseapp.com',
  databaseURL: 'https://foodieplaces-3311d.firebaseio.com',
  projectId: 'foodieplaces-3311d',
  storageBucket: 'foodieplaces-3311d.appspot.com',
  messagingSenderId: '250531200668',
};
firebase.initializeApp(config);
const database = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
// const initializeMessaging = initializePush;

export {
  database,
  auth,
  storage,
  // initializeMessaging,
};
