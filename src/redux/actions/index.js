import firebase from 'firebase';
import {
  // auth,
  database,
  storage,
} from '../../config/Firebase-config';

export const LOGIN = 'LOGIN';
export const ADD_CONTACT = 'ADD_CONTACT';
export const GET_CONTACTS = 'GET_CONTACTS';
export const TOGGLE_FAV = 'TOGGLE_FAV';
export const RM_CONTACT = 'RM_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';

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

function getContacts(contacts) {
  return {
    type: GET_CONTACTS,
    payload: contacts,
  };
}

export function getContactsThunk(user) {
  return (dispatch) => {
    const contacts = [];
    database
      .ref(`${user.uid}/contacts`)
      .once('value', (snap) => {
        snap.forEach((data) => {
          const contact = data.val();
          contact.key = data.key;
          contacts.push(contact);
        });
      })
      .then(() => {
        dispatch(getContacts(contacts));
      });
  };
}

function addContact(contact) {
  return {
    type: ADD_CONTACT,
    payload: contact,
  };
}

export function addContactThunk(user, contact) {
  return (dispatch) => {
    database
      .ref(`${user.uid}/contacts`)
      .push(contact)
      .once('value')
      .then((snap) => {
        const contactV = snap.val();
        contactV.key = snap.key;
        dispatch(addContact(contactV));
      });
  };
}

function editContact(contact) {
  return {
    type: EDIT_CONTACT,
    payload: contact,
  };
}
export function editContactThunk(user, contact, image) {
  return (dispatch) => {
    if (image) {
      storage.refFromURL(image).delete();
    }
    database
      .ref(`${user.uid}/contacts/${contact.key}`)
      .set(contact)
      .then(() => {
        dispatch(editContact(contact));
      });
  };
}

function deleteContact(contact) {
  return {
    type: RM_CONTACT,
    payload: contact,
  };
}
export function deleteContactThunk(contact, user) {
  return (dispatch) => {
    if (contact.image) {
      storage.refFromURL(contact.image).delete();
    }
    database
      .ref(`${user.uid}/contacts/${contact.key}`)
      .remove()
      .then(() => {
        dispatch(deleteContact(contact));
      });
  };
}

function toggleFavourite(contact) {
  return {
    type: TOGGLE_FAV,
    payload: contact,
  };
}

export function toggleFavouriteThunk(contact, user) {
  return (dispatch) => {
    const contactV = contact;
    contactV.isFavourite = !contact.isFavourite;
    database
      .ref(`${user.uid}/contacts/${contactV.key}`)
      .set(contactV)
      .then(() => {
        dispatch(toggleFavourite(contactV));
      });
  };
}
