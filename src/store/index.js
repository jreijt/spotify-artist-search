import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";
import initialState from "./initialState";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "auth",
  storage,
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeStore = () => {
  let store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(thunk)
  );
  let persistor = persistStore(store);
  return {
    store,
    persistor
  };
};

export default composeStore;
