import React from "react";

import axios from "./axios";

function Header() {
  return (
    <div>
      <header id="header_component">
        <p id="header_logo">ZEN</p>{" "}
        <a href="/logout">
          <p id="logout_text">Logout</p>
        </a>
        <a href="/chat">
          <p id="chat_text">Chat</p>
        </a>
        <a href="/online_users">
          <p id="online_text">Online</p>
        </a>
        <a href="/friends">
          <p id="friends_text">Friends</p>
        </a>
      </header>
    </div>
  );
}

export default Header;
