import React from "react";

import ReactDOM from "react-dom";

import Logo from "./logo";

import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";

import Login from "./login";

///////REACT COMPONENT//////////////////////////

/////Class Component//////////////

///////components start with capital////////

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
        <h1>Welcome!</h1>
        <img src="/logo.jpg" />
        <HashRouter>
          <div>
            <Route exact path="/" component={Registration} />
            <Route path="/login" component={Login} />
          </div>
        </HashRouter>
      </div>
    );
  } // end of render
} // end of Hello component

function GreeteeEditor(props) {
  return <input onChange={props.handleChange} />;
} // end of GreeteeEditor

function Greetee(props) {
  console.log("props:", props);
  return (
    <div>
      <h3>Greetee component {props.name} </h3>
    </div>
  );
} // end Greetee

/// checks if the pathname is welcome and re-routs you
let elem;

if (location.pathname === "/welcome") {
  console.log("we are taking Welcome");
  elem = <Welcome />;
} else {
  console.log("we are taking Logo");
  elem = <Logo />;
}
///////// RENDERE! its good to have in the bottom cause example class component does not hoist///////////

ReactDOM.render(elem, document.querySelector("main"));

// <div className="splash">
//   <Registration />
//   <h1 className="splash_text">{this.state.name}! </h1>
//   <Greetee
//     ////these are the props////////
//     name={this.state.name}
//     address={this.state.address}
//   />
//   <GreeteeEditor handleChange={this.handleChange} />
// </div>
