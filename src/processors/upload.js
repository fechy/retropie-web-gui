import fetch from 'isomorphic-fetch';

export const upload = async (config, filesData) => {
  const headers = new Headers();

  const formData  = new FormData();
  //formData.append('files', filesData);
  formData.append('platform', JSON.stringify(config));

  filesData.forEach((file, i)=> {
    formData.append(`files[${i}]`, file, file.name);
  });

  return await fetch(`/api/upload`, {
    method: 'POST',
    mode: 'cors',
    body: formData,
    headers: headers
  }).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }

    return response.json();
  });
};

export default {
  upload
}
