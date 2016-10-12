import fetch from 'isomorphic-fetch';

import { FETCH_LIST } from '../constants';

export function list(platform) {
  return {
    type: FETCH_LIST,
    payload: new Promise(resolve => {
      fetch(`/api/list/${platform}`).then(response => {
        resolve(response.json());
      });
    })
  };
}
