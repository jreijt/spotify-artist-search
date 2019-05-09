import ActionTypes from "../types";
import { ApiService } from "../../services";

export default {
  searchArtist: query => {
    return (dispatch, getState) => {
      dispatch({
        type: ActionTypes.ARTIST_SEARCH_ATTEMPT
      });

      const state = getState();

      return ApiService.searchArtist(state.auth.accessToken, query)
        .then(response => {
          if (!response.error) {
            response.artists.query = query;

            dispatch({
              type: ActionTypes.ARTIST_SEARCH_SUCCESS,
              payload: response
            });

            return response;
          }

          if (response.error.status === 401)
            dispatch({
              type: ActionTypes.USER_SIGNOUT
            });

          dispatch({
            type: ActionTypes.ARTIST_SEARCH_ERROR
          });
        })
        .catch(err => {
          dispatch({
            type: ActionTypes.ARTIST_SEARCH_ERROR
          });

          dispatch({
            type: ActionTypes.ERROR_OCCURED,
            payload: "Something went wrong. Please try again."
          });
        });
    };
  },
  getArtistAlbums: artistId => {
    return (dispatch, getState) => {
      dispatch({
        type: ActionTypes.GET_ARTIST_ALBUMS_ATTEMPT
      });

      const state = getState();

      return ApiService.getArtistAlbums(state.auth.accessToken, artistId)
        .then(response => {
          if (!response.error) {
            response.artistId = artistId;

            dispatch({
              type: ActionTypes.GET_ARTIST_ALBUMS_SUCCESS,
              payload: response
            });

            return response;
          }

          if (response.error.status === 401)
            dispatch({
              type: ActionTypes.USER_SIGNOUT
            });

          if (
            response.error.status === 400 &&
            response.error.message === "invalid id"
          )
            dispatch({
              type: ActionTypes.ERROR_OCCURED,
              payload: "Artist does not exist."
            });

          dispatch({
            type: ActionTypes.GET_ARTIST_ALBUMS_ERROR
          });
        })
        .catch(err => {
          dispatch({
            type: ActionTypes.GET_ARTIST_ALBUMS_ERROR
          });

          dispatch({
            type: ActionTypes.ERROR_OCCURED,
            payload: "Something went wrong. Please try again."
          });
        });
    };
  }
};
