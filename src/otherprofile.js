import React from "react";
import axios from "./axios";
import Background from "./background";

import FriendshipButton from "./friendshipbutton";

class OtherProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      lastName: "",
      email: "",
      bio: "",
      picurl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/madcitygg-profile_image-d182e6f9183999a2-300x300.jpeg",
      modal: false
    };
  }

  componentDidMount() {
    axios.get(`/other-user/${this.props.match.params.userId}`).then(results => {
      console.log("axios in other :", this.props.match.params.userId);
      this.setState({
        id: results.data.id,
        name: results.data.first_name,
        lastName: results.data.last_name,
        email: results.data.email,
        picurl: results.data.picurl,
        bio: results.data.bio
      });
    });
  }
  render() {
    return (
      <div id="profile_container">
        <Background />
        <img id="picInProfile" src={this.state.picurl} />
        <br />
        <div id="profile_info">
          <h1 id="biger_text">
            {this.state.lastName} {this.state.name}
          </h1>
          <br />
          <h1 id="small_text">{this.state.bio}</h1>
          <br />
          <FriendshipButton id={this.props.match.params.userId} />
        </div>
      </div>
    );
  }
}

export default OtherProfile;

// <textarea defaultValue={this.state.bio} />
//
// <img id="picInProfile" src={this.state.picurl} />
//
// {this.state.name} {this.state.last_name} {this.state.bio}
