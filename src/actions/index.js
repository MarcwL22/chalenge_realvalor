import axios from 'axios';
import { FETCH_COMICS, FETCH_COMICS_SUCCESS, FETCH_ERROR } from './types';
// Config
import { hash, public_key, ts, api_url } from '../config';

export const fetchComics = (search = null, offset = null) => dispatch => {
  const testYear = /(?:(?:19|20)[0-9]{2})/;
  let startYear = null;
  let title = null;
  if (testYear.test(search)) {
    startYear = search;
  } else {
    title = search;
  }
  const req = axios.get(`${api_url}/v1/public/comics`, {
    params: {
      offset,
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
