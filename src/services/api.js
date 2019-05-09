import { apiEndpoint } from "../constants";

export default {
  signIn: accessToken => {
    return fetch(`${apiEndpoint}/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    }).then(response => response.json());
  },
  searchArtist: (accessToken, query) => {
    return fetch(`${apiEndpoint}/search?q=${query}&type=artist`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    }).then(response => response.json());
  },
  getArtistAlbums: (accessToken, artistId) => {
    return fetch(`${apiEndpoint}/artists/${artistId}/albums`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    }).then(response => response.json());
  }
};
