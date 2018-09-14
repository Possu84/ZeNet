import App from "./app";

import React from "react";

import Logo from "./logo";

import Login from "./login";

import Welcome from "./welcome";

import ReactDOM from "react-dom";

import reduxPromise from "redux-promise";

import Registration from "./registration";

import { reducer } from "./reducer"; ///// when in curlies expot without default

import { Provider } from "react-redux";

import { HashRouter, Route } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import { getSocket } from "./socket";
/// checks if the pathname is welcome and re-routs you to the right page accordingly

///////

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

const ReAppWrap = (getSocket(store),
(
  <Provider store={store}>
    <App />
  </Provider>
));

let elem;

if (location.pathname === "/welcome") {
  console.log("we are taking Welcome");
  elem = <Welcome />;
} else {
  console.log("we are taking App");
  elem = ReAppWrap;
}
///////// RENDERE! its good to have in the bottom cause example class component does not hoist///////////

ReactDOM.render(elem, document.querySelector("main"));
