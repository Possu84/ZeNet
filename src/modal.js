import React from "react";

import LogoText from "./logotext";

import App from "./app";

function Modal(props) {
  return (
    <div id="modal">
      <h1 id="small_logo"> ZEN </h1>
      <h1 />
      <br />
      <p id="small_text"> Upload new profile picture </p>
      <br />

      <input
        id="myInput"
        type="file"
        accept="image/*"
        onChange={props.upLoadPic}
      />
    </div>
  );
}

export default Modal;
