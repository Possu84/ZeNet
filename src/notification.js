import React from "react";
import { connect } from "react-redux";
import App from "./app";

import { getSocket } from "./socket";
import Background from "./background";

import { closeTheNotification } from "./actions";

function Notification(props) {
  if (!props.notification) {
    return null;
  }
  return (
    <div id="notification_modal">
      <p
        id="the-x"
        onClick={() => {
          props.dispatch(closeTheNotification());
        }}
      >
        X
      </p>
      <h1 id="biger_text">YOU HAVE A FRIEND REQUEST!</h1>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

export default connect(mapStateToProps)(Notification);
