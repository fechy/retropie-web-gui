import fetch from 'isomorphic-fetch';

import { SYSTEM_STATS } from '../constants';

export function diskUsage() {
  return {
    type: SYSTEM_STATS,
    payload: new Promise(resolve => {
      fetch('/api/stats').then(response => {
        resolve(response.json());
      });
    })
  }
}
