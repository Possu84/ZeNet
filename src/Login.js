import React from "react";

import axios from "./axios";

import { Link } from "react-router-dom";

import Background from "./background";

import LogoText from "./logotext";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    /// binds the login button
    this.loginPost = this.loginPost.bind(this);
  } /// end of constructor
  handleChange(e) {
    this[e.target.name] = e.target.value;
  }
  loginPost() {
    axios
      .post("/login", {
        email: this.email,
        password: this.password
      }) // end axios.post
      .then(({ data }) => {
        if (data.success) {
          location.replace("/");
        } else {
          this.setState({
            error: true
          });
        } // end of else
      }); // end of then
  } // end of login function
  render() {
    return (
      <div id="login_block">
        {this.state.error && (
          <div className="error">check your email and password</div>
        )}
        <input onChange={this.handleChange} name="email" placeholder="email" />
        <br />
        <input
          onChange={this.handleChange}
          name="password"
          placeholder="password"
        />
        <br />
        <button onClick={this.loginPost} name="register">
          Login
        </button>
        <br />

        <Link className="link_text" to="/">
          or Register
        </Link>
      </div>
    );
  }
}

// function Login() {
//   return (
//     <div>
//       <input id="email" type="text" name="email" placeholder="email" />
//       <input
//         id="last_name_input"
//         type="text"
//         name="password"
//         placeholder="password"
//       />
//       <button type="submit">Login</button>
//       <Link to="/">Click here for registration!</Link>
//     </div>
//   );
// }

export default Login;
