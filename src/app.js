import React from "react";

import ReactDOM from "react-dom";

import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";

import Login from "./login";

import { Link } from "react-router-dom";

import axios from "./axios";

import ProfilePic from "./profilePic";

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
      picurl:
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
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    axios.get("/getuser").then(({ data }) => {
      console.log(
        "login",
        data,
        data.id,
        data.first_name,
        data.last_name,
        data.email,
        data.picurl
      );
      this.setState({
        id: data.id,
        name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        picurl: data.picurl
      });

      console.log(this.state);
    });
  }

  upLoadPic(e) {
    console.log("upload", e, e.target.files[0], FormData);
    let file = e.target.files[0];

    this.setState({ file: e.target.files[0] });

    const fd = new FormData();

    fd.append("file", file);
    axios.post("/uploadPic", fd).then(({ data }) => {
      console.log("logging data", data);
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
        <LogoText />
        <ProfilePic picurl={this.state.picurl} toggleModal={this.toggleModal} />
        {this.state.modal && <Modal upLoadPic={this.upLoadPic} />}{" "}
        {/* this is conditional rendering */}
      </div>
    );
  }
}

export default App;
