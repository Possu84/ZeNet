import React from "react";

import ReactDOM from "react-dom";

import Logo from "./logo";

import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";

import Login from "./login";

import App from "./app";

import Welcome from "./welcome";

/// checks if the pathname is welcome and re-routs you to the right page accordingly
let elem;

if (location.pathname === "/welcome") {
  console.log("we are taking Welcome");
  elem = <Welcome />;
} else {
  console.log("we are taking App");
  elem = <App />;
}
///////// RENDERE! its good to have in the bottom cause example class component does not hoist///////////

ReactDOM.render(elem, document.querySelector("main"));
