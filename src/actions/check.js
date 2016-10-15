import fetch from 'isomorphic-fetch';
import fileExtension from 'file-extension';

import { CHECK_FOLDERS, CHECK_INVALID_FILES } from '../constants';

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

export function checkInvalidFiles(files, extensions) {
  return {
    type: CHECK_INVALID_FILES,
    payload: new Promise(resolve => {
      let invalid = [];
      files.map(filename => {
        const ext = fileExtension(filename);
        if (extensions.indexOf(`.${ext}`) == -1) {
          invalid.push(filename);
        }
      });

      resolve(invalid);
    })
  }
}
