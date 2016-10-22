import fetch from 'isomorphic-fetch';

import { SYSTEM_STATS, SYSTEM_TEMPERATURE } from '../constants';

export function update(data) {
  return {
    type: SYSTEM_STATS,
    payload: new Promise(resolve => {
      resolve(data);
    })
  }
}

export function updateTemp(data) {
  return {
    type: SYSTEM_TEMPERATURE,
    payload: new Promise(resolve => {
      resolve(data);
    })
  }
}
