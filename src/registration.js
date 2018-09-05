import React from "react";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.registerClick = this.registerClick.bind(this);
  }
  registerClick() {
    console.log("clickClick MF");
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    return (
      <div className="registration">
        <input
          id="first_name_input"
          type="text"
          name="first_name"
          placeholder="first name"
        />
        <input
          id="last_name_input"
          type="text"
          name="last_name"
          placeholder="last name"
        />
        <input
          id="last_name_input"
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          id="last_name_input"
          type="text"
          name="password"
          placeholder="password"
        />
        <button onClick={this.registerClick}> Register </button>
      </div>
    );
  }
}

export default Registration;
