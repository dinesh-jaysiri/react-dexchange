import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "normalize.css";
import { Provider } from "react-redux";
import App from "./components/App";
import configureStore from "./store/configureStore";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
