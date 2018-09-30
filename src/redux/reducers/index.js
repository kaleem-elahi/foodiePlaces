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
      return {
        ...state,
        restaurants: action.payload,
      };
    case ADD_RESTAURANT:
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload],
      };
    case EDIT_RESTAURANT: {
      const index = state.restaurants.findIndex(restaurant => restaurant.id === action.payload.id);
      state[index] = action.payload;
      const newRestaurants = state.restaurants.map(restaurant => restaurant);
      return {
        ...state,
        restaurants: newRestaurants,
      };
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
