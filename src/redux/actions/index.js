import firebase from 'firebase';
import {
  // auth,
  database,
  storage,
} from '../../config/Firebase-config';

export const LOGIN = 'LOGIN';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const TOGGLE_FAV = 'TOGGLE_FAV';
export const REMOVE_RESTAURANT = 'REMOVE_RESTAURANT';
export const EDIT_RESTAURANT = 'EDIT_RESTAURANT';

function login(authData) {
  return {
    type: LOGIN,
    payload: authData,
  };
}

export function loginThunk(callback) {
  return (dispatch) => {
    // const authData = {};
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then((res) => {
        dispatch(login(res));
        callback();
      });
  };
}

function getRestaurants(restaurants) {
  return {
    type: GET_RESTAURANTS,
    payload: restaurants,
  };
}

export function getRestaurantsThunk(user) {
  return (dispatch) => {
    const restaurants = [];
    database
      .ref(`${user.uid}/restaurants`)
      .once('value', (snap) => {
        snap.forEach((data) => {
          const restaurant = data.val();
          restaurant.key = data.key;
          restaurants.push(restaurant);
        });
      })
      .then(() => {
        console.log(restaurants);
        dispatch(getRestaurants(restaurants));
      });
  };
}

function addRestaurant(restaurant) {
  return {
    type: ADD_RESTAURANT,
    payload: restaurant,
  };
}

export function addRestaurantThunk(user, restaurant) {
  return (dispatch) => {
    database
      .ref(`${user.uid}/restaurants`)
      .push(restaurant)
      .once('value')
      .then((snap) => {
        const restaurantV = snap.val();
        restaurantV.key = snap.key;
        dispatch(addRestaurant(restaurantV));
      });
  };
}

function editRestaurant(restaurant) {
  return {
    type: EDIT_RESTAURANT,
    payload: restaurant,
  };
}
export function editRestaurantThunk(user, restaurant, image) {
  return (dispatch) => {
    if (image) {
      storage.refFromURL(image).delete();
    }
    database
      .ref(`${user.uid}/restaurants/${restaurant.key}`)
      .set(restaurant)
      .then(() => {
        dispatch(editRestaurant(restaurant));
      });
  };
}

function deleteRestaurant(restaurant) {
  return {
    type: REMOVE_RESTAURANT,
    payload: restaurant,
  };
}
export function deleteRestaurantThunk(restaurant, user) {
  return (dispatch) => {
    if (restaurant.image) {
      storage.refFromURL(restaurant.image).delete();
    }
    database
      .ref(`${user.uid}/restaurants/${restaurant.key}`)
      .remove()
      .then(() => {
        dispatch(deleteRestaurant(restaurant));
      });
  };
}

function toggleFavourite(restaurant) {
  return {
    type: TOGGLE_FAV,
    payload: restaurant,
  };
}

export function toggleFavouriteThunk(restaurant, user) {
  return (dispatch) => {
    const restaurantV = restaurant;
    restaurantV.isFavourite = !restaurant.isFavourite;
    database
      .ref(`${user.uid}/restaurants/${restaurantV.key}`)
      .set(restaurantV)
      .then(() => {
        dispatch(toggleFavourite(restaurantV));
      });
  };
}
