import fetch from 'isomorphic-fetch';

export const list = async (platform) => {
  return await fetch(`/api/list/${platform}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      return response.json();
    });
};

export default {
  list
};
