import firebase from "firebase";
const config = {
  apiKey: "AIzaSyC8Vlex1qpiaE_7eceAANTgLVtORc_ELZo",
  authDomain: "foodieplaces-3311d.firebaseapp.com",
  databaseURL: "https://foodieplaces-3311d.firebaseio.com",
};
firebase.initializeApp(config);
const database = firebase.database();
const auth = firebase.auth();
export { database, auth };
