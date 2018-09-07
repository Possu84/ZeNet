import React from "react";

import ReactDOM from "react-dom";

import Logo from "./logo";

import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";

import Login from "./login";

import { Link } from "react-router-dom";

import axios from "./axios";

import ProfilePic from "./profilepic";

import LogoText from "./logotext";

import Modal from "./modal";

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
      imageUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/madcitygg-profile_image-d182e6f9183999a2-300x300.jpeg",
      modal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);

    this.upLoadPic = this.upLoadPic.bind(this);
  } /// end of constructor
  handleChange(e) {
    this[e.target.name] = e.target.value;
  }

  toggleModal() {
    console.log("clic");
    this.setState({
      modal: !this.state.modal
    });
  }
  upLoadPic() {
    console.log("clic");
  }
  componentDidMount() {
    axios.get("/getuser").then(({ data }) => {
      console.log("login the datas", data);
      this.setState({
        name: resp.data.name
      });
    });
  }
  render() {
    return (
      <div id="app_main">
        <LogoText />
        <ProfilePic toggleModal={this.toggleModal} />
        {this.state.modal && <Modal upLoadPic={this.upLoadPic} />}{" "}
        {/* this is conditional rendering */}
      </div>
    );
  }
}

export default App;
