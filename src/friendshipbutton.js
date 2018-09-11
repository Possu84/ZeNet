import React from "react";
import axios from "./axios";

export default class FriendshipButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0 /// the begingging status is 0  so there is no row or status
    };
  }

  componentDidMount() {
    console.log("frindship button :", this.props.id); /// gives us the url from url

    axios.get("/get-frindship/" + this.props.id).then(result => {});
  }

  buttonText() {
    /// button text reads the status from this.state

    // inside the button we call inside curlies the button function and cross our fingers that it will render

    if (this.state.status == 0) {
      return "Make a new friend";
    }
  }
  handleRequest() {
    console.log("click the handle request");
    ///// this updates the status based on the status of the friendship
  }

  render() {
    return <button onClick={this.handleRequest}> {this.buttonText()} </button>;
  }
}
