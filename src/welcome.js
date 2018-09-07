import React from "react";

import ReactDOM from "react-dom";

import Logo from "./logo";

import LogoText from "./logotext";

import { HashRouter, Route } from "react-router-dom";

import Login from "./login";

import App from "./app";

import Registration from "./registration";

import Background from "./background";

////////////////////////////////////////

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: ""
    };
    this.handleChange = this.handleChange.bind(this);
  } // end of Constructor

  /////////Handle change sets text field to what ever is in imput field

  handleChange(e) {
    console.log("user input", e.target.value);
    /////this is ansyncrounous that why were are using call back
    this.setState(
      {
        name: e.target.value
      },
      () => console.log("this state", this.state)
    ); //// <= here call back
  } /// end of handleChange

  componentDidMount() {
    console.log("component did mount");
  }

  /////// inside render is jsx /////////

  render() {
    return (
      <div id="welcome">
        <LogoText />
        <Background />
        <HashRouter>
          <div>
            <Route exact path="/" component={Registration} />
            <Route exact path="/login" component={Login} />
          </div>
        </HashRouter>
      </div> // end of welcome div
    );
  } // end of render
} // end of Hello component

export default Welcome;

///////components start with capital////////
