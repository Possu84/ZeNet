import React from "react";

import axios from "./axios";

function Header() {
  return (
    <div>
      <header id="header_component">
        <p id="header_logo">ZEN</p>{" "}
        <div className="navi_container">
          <a href="/logout">
            <p className="navi_text">Logout</p>
          </a>
          <a href="/chat">
            <p className="navi_text">Chat</p>
          </a>
          <a href="/online_users">
            <p className="navi_text">Online</p>
          </a>
          <a href="/friends">
            <p className="navi_text">Friends</p>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Header;
