import { combineReducers } from 'redux';
import { FETCH_COMICS, FETCH_COMICS_SUCCESS, FETCH_ERROR } from '../actions/types';

// Reducer
const INITIAL_STATE = {
  comicBooksData: { results: [] },
  charactersData: [],
  loading: false,
  loadingCharacter: false,
  error: false
};

const comicReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMICS:
      return { ...state, loading: true };
    case FETCH_COMICS_SUCCESS:
      return { ...state, loading: false, comicBooksData: action.payload, error: false };
    case FETCH_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default combineReducers({
  comicReducers
});
