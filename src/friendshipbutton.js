import React from "react";
import axios from "./axios";

export default class FriendshipButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0 /// the begingging status is 0  so there is no row or status
    };

    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    console.log("did mount in the friendship button :", this.props.id); /// gives us the url from url

    axios.get("/get-friendship/" + this.props.id).then(result => {
      console.log(
        "logging the result in component did mount friendship button",
        result
      );
    });
  }

  buttonText() {
    /// button text reads the status from this.state

    // inside the button we call inside curlies the button function and cross our fingers that it will render

    if (this.state.status == 0) {
      return "Make a new friend";
    }
    if (this.state.status == 1) {
      return "Frind Pending";
    } else if (this.state.status == 2) {
      return "'delete' your 'friend'";
    }
  }

  handleRequest() {
    console.log("at button handler user id:", this.props.id);
    axios
      .post("/get-new-friend/", {
        id: this.props.id
        /* we are exporting the other users id value here
        and labeling it as an id. It will be accessasible
        with req.body.id on the server. This is req.body
        instead of parames cause we are making it is an object*/
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("logging error", err);
      });
    ///// this updates the status based on the status of the friendship
  }

  render() {
    return <button onClick={this.handleRequest}> {this.buttonText()} </button>;
  }
}
