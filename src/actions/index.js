import axios from 'axios';
import { FETCH_COMICS, FETCH_COMICS_SUCCESS, FETCH_ERROR } from './types';
// Config
import { hash, public_key, ts } from '../config';

const MARVEL_URL = 'http://gateway.marvel.com/';

export const fetchComics = (search = null) => dispatch => {
  const testYear = /(?:(?:19|20)[0-9]{2})/;
  let startYear = null;
  let title = null;
  if (testYear.test(search)) {
    startYear = search;
  } else {
    title = search;
  }
  const req = axios.get(`${MARVEL_URL}/v1/public/comics`, {
    params: {
      title,
      startYear,
      apikey: public_key,
      hash,
      ts
    }
  });
  dispatch({ type: FETCH_COMICS });
  req.then(
    ({ data }) => dispatch({ type: FETCH_COMICS_SUCCESS, payload: data.data }),
    e => {
      dispatch({ type: FETCH_ERROR });
    }
  );
};
