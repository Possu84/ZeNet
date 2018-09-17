import React from "react";
import Background from "./background";

function OnlineUsers(props) {
  return (
    <div id="onlineUsers_container">
      <Background />

      <div id="friend_profile_container">
        <h1 id="biger_text">
          {props.first_name}
          {props.last_name}
        </h1>
      </div>
    </div>
  );
}

export default OnlineUsers;
