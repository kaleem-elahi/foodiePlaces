import {
  GET_RESTAURANTS,
  TOGGLE_FAV,
  ADD_RESTAURANT,
  REMOVE_RESTAURANT,
  EDIT_RESTAURANT,
  LOGIN,
} from '../actions';

export default function fetchRestaurants(state = [], action) {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case GET_RESTAURANTS:
      return action.payload;
    case ADD_RESTAURANT:
      return [...state, action.payload];
    case EDIT_RESTAURANT: {
      const index = state.findIndex(restaurant => restaurant.id === action.payload.id);
      state[index] = action.payload;
      const newRestaurants = state.map(restaurant => restaurant);
      return newRestaurants;
    }
    case REMOVE_RESTAURANT:

      return state.filter(task => task.id !== action.payload.id);
    case TOGGLE_FAV: {
      const newRestaurants = state.map(restaurant => restaurant);
      return newRestaurants; }
    default:
      return state;
  }
}
