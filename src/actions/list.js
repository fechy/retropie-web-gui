import fetch from 'isomorphic-fetch';

import { FETCH_LIST } from '../constants';

export function list(system) {
  return {
    type: FETCH_LIST,
    payload: new Promise(resolve => {
      fetch(`/api/list/${system}`).then(response => {
        resolve(response.json());
      });
    })
  };
}
