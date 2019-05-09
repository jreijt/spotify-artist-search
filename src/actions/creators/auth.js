import ActionTypes from "../types";
import { ApiService } from "../../services";

export default {
  signIn: accessToken => {
    return dispatch => {
      dispatch({
        type: ActionTypes.USER_SIGNIN_ATTEMPT,
        payload: accessToken
      });

      return ApiService.signIn(accessToken)
        .then(response => {
          if (!response.error) {
            dispatch({
              type: ActionTypes.USER_SIGNIN_SUCCESS,
              payload: response
            });

            return response;
          }

          dispatch({
            type: ActionTypes.ERROR_OCCURED,
            payload: response.error.message
          });

          dispatch({
            type: ActionTypes.USER_SIGNIN_ERROR
          });
        })
        .catch(err => {
          dispatch({
            type: ActionTypes.USER_SIGNIN_ERROR
          });

          dispatch({
            type: ActionTypes.ERROR_OCCURED,
            payload: "Something went wrong. Please try again."
          });
        });
    };
  },
  signOut: () => {
    return {
      type: ActionTypes.USER_SIGNOUT
    };
  }
};
