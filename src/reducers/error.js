import InitialState from "../store/initialState";
import handler from "./handler";

var reacts = {};

reacts.ERROR_OCCURED = function(state, payload) {
  let _s = [];
  _s.push(payload);
  return _s;
};

reacts.ERROR_CLEAR = function(state, payload) {
  return [];
};

export default (state = InitialState.errors, action) => {
  return handler(state, action, reacts);
};
