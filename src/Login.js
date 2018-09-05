import React from "react";

import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <input id="email" type="text" name="email" placeholder="email" />
      <input
        id="last_name_input"
        type="text"
        name="password"
        placeholder="password"
      />
      <button type="submit">Login</button>
      <Link to="/">Click here for registration!</Link>
    </div>
  );
}

export default Logo;
