import React from "react";

class OnlineUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: Jonas,
      last_name: Pooters,
      picurl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/madcitygg-profile_image-d182e6f9183999a2-300x300.jpeg"
    };
  }

  componentDidMount() {
    axios.get().then(results => {
      console.log("onlineusers component mounted + results from db.q", resp);
    });
  }
  render() {
    return (
      <div id="onlineUsers_container">
        <Background />
        <img id="picInProfile" src={this.state.picurl} />
        <div>
          <h1>HELLO THERE</h1>
          <h1 id="small_text">
            {this.state} {this.state.name}
          </h1>
          <br />
          <h1 id="small_text">{this.state.bio}</h1>
        </div>
      </div>
    );
  }
}

export default OnlineUsers;
