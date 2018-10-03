import firebase from 'firebase';
import { toast } from 'react-toastify';
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
      })
      .catch((err) => {
        console.log(err, err.response, 'err');
        toast.error(err.message);
        toast(err.message);
      });
  };
}

export function getRestaurants(restaurants) {
  return {
    type: GET_RESTAURANTS,
    payload: restaurants,
  };
}

export function addRestaurant(restaurant) {
  return {
    type: ADD_RESTAURANT,
    payload: restaurant,
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

export function toggleFavourite(restaurant) {
  return {
    type: TOGGLE_FAV,
    payload: restaurant,
  };
}
