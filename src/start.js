import React from "react";

import Login from "./login";

import Registration from "./registration.js";

import ReactDOM from "react-dom";

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
        <img src="/logo.jpg" />
        <h1>Welcome to </h1>
        <h1 className="splash_text">{this.state.name}! </h1>
        <Greetee
          ////these are the props////////
          name={this.state.name}
          address={this.state.address}
        />
        <GreeteeEditor handleChange={this.handleChange} />
        <Registration />
        <Login />
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

///////// RENDERE! its good to have in the bottom cause example class component does not hoist///////////

ReactDOM.render(<Welcome />, document.querySelector("main"));
