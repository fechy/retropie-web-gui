import fetch from 'isomorphic-fetch';

import { CHECK_FOLDERS } from '../constants';

export function check() {
  return {
    type: CHECK_FOLDERS,
    payload: new Promise(resolve => {
      fetch(`/api/check`).then(response => {
        resolve(response.json());
      });
    })
  };
}
