import fetch from 'isomorphic-fetch';

import { UPLOAD } from '../constants';

export function upload(config, filesData) {
  const headers = new Headers();

  const formData  = new FormData();

  formData.append('platform', JSON.stringify(config));

  filesData.forEach((file, i)=> {
    formData.append(`files[${i}]`, file, file.name);
  });

  const payload = {
    method: 'POST',
    mode: 'cors',
    body: formData,
    headers: headers
  };

  return {
    type: UPLOAD,
    payload: new Promise(resolve => {
      fetch(`/api/upload`, payload).then((response) => {
        resolve(response.json());
      });
    })
  };
}
