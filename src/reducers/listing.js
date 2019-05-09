import InitialState from "../store/initialState";
import handler from "./handler";

var reacts = {};

reacts.ARTIST_SEARCH_ATTEMPT = function(listing, payload) {
  var _l = { ...listing };
  _l.artists = {};

  return _l;
};

reacts.ARTIST_SEARCH_SUCCESS = function(listing, payload) {
  var _l = { ...listing, ...payload };

  return _l;
};

reacts.GET_ARTIST_ALBUMS_ATTEMPT = function(listing, payload) {
  var _l = { ...listing };
  _l.albums = {};

  return _l;
};

reacts.GET_ARTIST_ALBUMS_SUCCESS = function(listing, payload) {
  var _l = { ...listing };
  _l.albums = payload;

  return _l;
};

reacts.USER_SIGNOUT = function(listing, payload) {
  var _l = { ...listing };

  _l = InitialState.listing;
  return _l;
};

export default (listing = InitialState.listing, action) => {
  return handler(listing, action, reacts);
};
