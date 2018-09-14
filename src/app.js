import React from "react";

import ReactDOM from "react-dom";

import Registration from "./registration";

import Login from "./login";

import { Link } from "react-router-dom";

import axios from "./axios";

import ProfilePic from "./profilePic";

import LogoText from "./logotext";

import Modal from "./modal";

import Background from "./background";

import Header from "./header";

import Profile from "./profile";

import FriendsAndFrenemies from "./friends";

import OtherProfile from "./otherprofile";

import { BrowserRouter, Route } from "react-router-dom";

//////////////////////////////////////////

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      bio: "",
      picurl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/madcitygg-profile_image-d182e6f9183999a2-300x300.jpeg",
      modal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);

    this.upLoadPic = this.upLoadPic.bind(this);

    this.toggleBio = this.toggleBio.bind(this);

    this.setBio = this.setBio.bind(this);
  } /// end of constructor
  handleChange(e) {
    this[e.target.name] = e.target.value;
  }
  toggleBio() {
    this.setState({
      showBio: !this.state.showBio
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    axios.get("/getuser").then(({ data }) => {
      this.setState({
        id: data.id,
        name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        picurl: data.picurl,
        bio: data.bio,
        showBio: false
      });
    });
  }

  setBio(e) {
    if (e.which === 13) {
      this.setState({
        bio: e.target.value,
        showBio: false
      });

      axios
        .post("/profile", {
          bio: e.target.value
        })
        .catch(error => {
          console.log("error in the axios post", error);
        });
    }
  }

  upLoadPic(e) {
    let file = e.target.files[0];

    this.setState({ file: e.target.files[0] });

    const fd = new FormData();

    fd.append("file", file);
    axios.post("/uploadPic", fd).then(({ data }) => {
      // this.updateImage(data.picurl);

      this.setState({
        picurl: data.picurl,
        modal: false
      });
    });
  }

  render() {
    return (
      <div id="app_main">
        <Header />
        <ProfilePic picurl={this.state.picurl} toggleModal={this.toggleModal} />
        {this.state.modal && <Modal upLoadPic={this.upLoadPic} />}{" "}
        {/* this is conditional rendering */}
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/"
              render={() => (
                <Profile
                  id={this.state.id}
                  firstName={this.state.name}
                  lastName={this.state.last_name}
                  picurl={this.state.picurl}
                  bio={this.state.bio}
                  showBio={this.state.showBio}
                  toggleBio={this.toggleBio}
                  setBio={this.setBio}
                />
              )}
            />
            <Route exact path="/user/:userId" component={OtherProfile} />
            <Route exact path="/friends" component={FriendsAndFrenemies} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
