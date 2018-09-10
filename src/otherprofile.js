import React from "react";
import axios from "./axios";

class Welcome extends React.Component {
  componentDidMount() {
    axios.get(`/get-user/${this.props.match.params.userId}`).then(resp => {});
  }
  render() {
    return (
      <div>
        <h1> OtherProfile </h1>
      </div>
    );
  }
}

export default OtherProfile;
