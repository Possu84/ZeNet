import React from "react";

/* this is Commented out */

/// we need to import this always // we dont use curlies cause its exported defaul somewhere else

import ReactDOM from "react-dom";

///////REACT COMPONENT//////////////////////////
//// functional component || dumm component//////

// function HelloWorld() {
//   let cohort = "Sesame";
//
//   let styleObject = {
//     color: "red",
//     fontSize: "50pxy6yyyy",
//     fontFamily: "Helvetica",
//     fontWeight: 300
//   };
//
//   return <div className="greeting" style={styleObject}>  Hello, {cohort}!</div>;
// }

/////Class Component//////////////

///////components start with capital////////
class Hello extends React.Component {
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
    console.log("user imput", e.target.value);
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
      <div className="splash">
        <h1>Welcome to </h1>
        <h1 className="splash_text">{this.state.name}! </h1>
        <Greetee
          ////these are the props////////
          name={this.state.name}
          address={this.state.address}
        />
        <GreeteeEditor handleChange={this.handleChange} />
        <Registration />
      </div>
    );
  } // end of render
} // end of Hello component

function GreeteeEditor(props) {
  return <input onChange={props.handleChange} />;
} // end of GreeteeEditor

function Registration() {
  return (
    <div className="registration">
      <input
        id="first_name_input"
        type="text"
        name="first_name"
        placeholder="first name"
      />
      <input
        id="last_name_input"
        type="text"
        name="last_name"
        placeholder="last name"
      />
      <input
        id="last_name_input"
        type="text"
        name="email"
        placeholder="email"
      />
      <input
        id="last_name_input"
        type="text"
        name="password"
        placeholder="password"
      />
    </div>
  );
}

function Greetee(props) {
  console.log("props:", props);
  return (
    <div>
      <h3>Greetee component {props.name} </h3>
    </div>
  );
} // end Greetee

///////// RENDERE! its good to have in the bottom cause example class component does not hoist///////////

ReactDOM.render(<Hello />, document.querySelector("main"));

// import Welcome from "./welcome";
//
// import Logo from "./log";

// elem =
//
// if (location.pathname == '/Welcome'{
//     elem = <Welcome />;
// } else {
//     elem = <Logo />;
// })

// function Logo() {
//   return <img src={logo.jpg} />;
// }

import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";

let elem;

if (location.pathname == "/welcome") {
  elem = <Welcome />;
} else {
  elem = <Logo />;
}

ReactDOM.render(elem, document.querySelector("main"));

////////"greeteeeditor"/////////å

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
