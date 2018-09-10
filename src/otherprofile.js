import React from "react";
import axios from "./axios";

class Welcome extends React.Component {
  componentDidMount() {
    axios.get(`/get-user/${this.props.match.params.userId}`).then(resp => {});
  }
  render() {
    return (
      <div>
        <h1> The OtherProfile </h1>
        <img id="picInProfile" src={props.picurl} />
        <textarea defaultValue={props.bio} />
        <div>
          <h1>
            {props.firstName} {props.lastName} {props.bio}
          </h1>

          {props.showBio ? (
            <textarea onKeyDown={props.setBio} defaultValue={props.bio} />
          ) : (
            <p onClick={props.toggleBio}>Update your bio.</p>
          )}
        </div>
      </div>
    );
  }
}

export default OtherProfile;
