import React from "react";
import axios from "./axios";

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
    console.log(
      "loggin in other profile",
      this.props,
      this.props.match.params.userId
    );
    axios.get(`/other-user/${this.props.match.params.userId}`).then(resp => {
      console.log("axios in other :", this.props.match.params.userId);
      this.setState({
        id: resp.data.id,
        name: resp.data.first_name,
        lastName: resp.data.last_name,
        email: resp.data.email,
        picurl: resp.data.picurl,
        bio: resp.data.bio
      });
    });
  }
  render() {
    return (
      <div id="profile_container">
        <img id="picInProfile" src={this.state.picurl} />
        <div>
          <h1 id="small_text">
            {this.state.lastName} {this.state.name} {this.state.bio}
          </h1>

          <button> Make a friend </button>
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
