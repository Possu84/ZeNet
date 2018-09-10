import React from "react";

import App from "./app";

function Profile(props) {
  console.log("pic url", props);
  return (
    <div id="profile_container">
      <img id="picInProfile" src={props.picurl} />
      <textareas defaultValue={props.bio} />
      <div>
        <h1>
          {props.firstName} {props.lastName} {props.bio}
        </h1>

        {props.showBio ? (
          <textarea onKeyDown={props.setBio} defaultValue={props.bio} />
        ) : (
          <p onClick={props.toggleBio}>Update your bio.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

// <p className="profiletext">{props.firstName} </p>
// <p className="profiletext">{props.lastName} </p>