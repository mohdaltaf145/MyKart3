import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//for using redux we have to use provider instead react.strictmode
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
//persist gate to persist redux state
import { PersistGate } from "redux-persist/integration/react";

//why we are using persist => because when we are login and refreshing the page the login get expires to avoid
//logged in user to get expire after refreshing the page we are using persist

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
