import React from "react";

import LogoText from "./logotext";

import App from "./app";

function Modal(props) {
  return (
    <div id="modal">
      <h1 id="small_logo"> ZEN </h1>
      <h1 />
      <p> DO you WaNt to upload some pics ;) </p>
      <p> we eNjoy iT gReatLy </p>
      <p id="uploadButton" onClick={props.upLoadPic}>
        {" "}
        UPLOAd{" "}
      </p>
    </div>
  );
}

export default Modal;
