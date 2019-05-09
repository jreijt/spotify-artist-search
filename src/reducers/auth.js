import InitialState from "../store/initialState";
import handler from "./handler";

var reacts = {};

reacts.USER_SIGNIN_ATTEMPT = function(state, payload) {
  var _s = { ...state };
  _s.isLoading = true;
  _s.accessToken = payload;
  return _s;
};

reacts.USER_SIGNIN_SUCCESS = function(state, payload) {
  var _s = { ...state };

  _s.isSignedIn = true;
  _s.isLoading = false;
  _s.user = payload;

  return _s;
};

reacts.USER_SIGNOUT = function(state, payload) {
  var _s = { ...state };

  _s = InitialState.auth;
  return _s;
};

reacts.ERROR_OCCURED = function(state) {
  var _s = { ...state };
  _s.isLoading = false;

  return _s;
};

export default (state = InitialState.auth, action) => {
  return handler(state, action, reacts);
};
