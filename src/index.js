import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import "flatpickr/dist/themes/material_green.css";
import axios from "axios";

axios.interceptors.request.use((config) => {
  if (localStorage.getItem("auth-token")) {
    config.headers.Authorization = JSON.parse(
      localStorage.getItem("auth-token")
    ).token;
  } else if (localStorage.getItem("user-token")) {
    const userToken = JSON.parse(localStorage.getItem("user-token")).token;
    if (userToken) {
      config.headers.Authorization = userToken;
    }
  }
  return config;
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
