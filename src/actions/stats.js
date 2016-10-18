import fetch from 'isomorphic-fetch';

import { SYSTEM_STATS } from '../constants';

export function update(data) {
  return {
    type: SYSTEM_STATS,
    payload: new Promise(resolve => {
      resolve(data);
    })
  }
}
