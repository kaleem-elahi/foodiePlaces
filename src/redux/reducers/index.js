import {
  GET_CONTACTS,
  TOGGLE_FAV,
  ADD_CONTACT,
  RM_CONTACT,
  EDIT_CONTACT,
  LOGIN,
} from '../actions';

export default function fetchContacts(state = [], action) {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case GET_CONTACTS:
      return action.payload;
    case ADD_CONTACT:
      return [...state, action.payload];
    case EDIT_CONTACT:

      const index = state.findIndex(contact => contact.id === action.payload.id);
      state[index] = action.payload;
      let newContacts = state.map(contact => contact);
      return newContacts;
    case RM_CONTACT:

      return state.filter(task => task.id !== action.payload.id);
    case TOGGLE_FAV:
      newContacts = state.map(contact => contact);
      return newContacts;
    default:
      return state;
  }
}
