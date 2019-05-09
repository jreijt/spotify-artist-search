import { combineReducers } from "redux";

import ListingReducer from "./listing";
import ErrorReducer from "./error";
import AuthReducer from "./auth";

export default combineReducers({
  errors: ErrorReducer,
  listing: ListingReducer,
  auth: AuthReducer
});
