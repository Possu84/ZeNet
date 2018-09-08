import React from "react";

import App from "./app";

function ProfilePic(props) {
  console.log("pic url", props.picurl);
  return (
    <div onClick={props.toggleModal}>
      <img src={props.picurl} />

      <h1> HEY HEY HEY </h1>
    </div>
  );
}

export default ProfilePic;
