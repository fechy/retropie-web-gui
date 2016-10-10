import fetch from 'isomorphic-fetch';

export default function list(platform, callback) {
  fetch(`/api/list/${platform}`).then((response) => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }

    return response.json();
  }).then(callback);
}
