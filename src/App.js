import React from "react";
import "./App.css";
import MainRouter from "./router/MainRouter";
import Header from "./components/Header";

import { Provider } from "react-redux";

import composeStore from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";

const compose = composeStore();

// compose.persistor.purge();

function App() {
  return (
    <div className="App">
      <Provider store={compose.store}>
        <PersistGate persistor={compose.persistor}>
          <Header />
          <MainRouter />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
