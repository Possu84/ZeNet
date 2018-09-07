import React from "react";

import App from "./app";

function ProfilePic(props) {
  return (
    <div onClick={props.toggleModal}>
      <img src="/logo.jpg" />
      <img src={props.url} />
    </div>
  );
}

export default ProfilePic;
