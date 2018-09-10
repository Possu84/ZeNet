import React from "react";

import App from "./app";

function ProfilePic(props) {
  console.log("pic url", props.picurl);
  return (
    <div onClick={props.toggleModal}>
      <img id="profilepic" src={props.picurl} />
    </div>
  );
}

export default ProfilePic;
