import React from "react";

import axios from "axios";

/////////////registration component////////////

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    // binds the register button
    this.registerClick = this.registerClick.bind(this);
  } // end constructor
  handleChange(e) {
    this[e.target.name] = e.target.value;
  } // end handleChange
  registerClick() {
    console.log("at Click", this.first_name_input);
    axios
      .post("/register", {
        first: this.first_name_input,
        last: this.last_name_input,
        email: this.email_input,
        password: this.password_input
      }) // end axios.post
      .then(({ data }) => {
        if (data.success) {
          location.replace("/");
        } else {
          this.setState({
            error: true
          });
        }
      }); // end of .then
  } /// end registerClick
  render() {
    return (
      <div>
        {this.state.error && <div className="error">Please try again</div>}
        <input
          onChange={this.handleChange}
          name="first_name_input"
          placeholder="first name.."
        />
        <input
          onChange={this.handleChange}
          name="last_name_input"
          placeholder="last name.."
        />
        <input
          onChange={this.handleChange}
          name="email_input"
          placeholder="email.."
        />
        <input
          onChange={this.handleChange}
          name="password_input"
          placeholder="password.."
        />

        <button onClick={this.registerClick} name="register">
          register
        </button>
      </div>
    ); // end of return
  } // end of renderer
} // end react component

export default Registration;
