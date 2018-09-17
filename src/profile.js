import React from "react";

import App from "./app";

import Background from "./background";

function Profile(props) {
  console.log("pic url", props);
  return (
    <div id="profile_container">
      <Background />
      <img id="picInProfile" src={props.picurl} />

      <div id="profile_info">
        <h1 id="biger_text">
          {props.firstName} {props.lastName}
        </h1>
        <br />
        <h1 id="small_text"> bio:</h1>
        <h1 id="small_text">{props.bio}</h1>
        <br />
        {props.showBio ? (
          <textarea
            id="text_area"
            onKeyDown={props.setBio}
            defaultValue={props.bio}
          />
        ) : (
          <p id="small_text" onClick={props.toggleBio}>
            Update your bio.
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;

// <p className="profiletext">{props.firstName} </p>
// <p className="profiletext">{props.lastName} </p>
