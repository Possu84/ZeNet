import React from "react";

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
    </div>
  );
}

export default Logo;
