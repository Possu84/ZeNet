import React from "react";
import Background from "./background";
import { connect } from "react-redux";
import ProfilePic from "./profilePic";

function OnlineUsers(props) {
  console.log("logging online users props", props.users);
  // because functional component there is no  this. but straight up props.users
  if (!props.users) {
    return null;
  }
  return (
    <div>
      <div>
        <div id="onlineUsers_container">
          <h1 id="friends_online_text"> Friends online </h1>
          {props.users.map(users => (
            /// must be props cause it comes from redux
            <div id="friend_profile_container" key={users.id}>
              <img id="picInProfile_online" src={users.picurl} />
              <h1 id="online_small_text">{users.first_name}</h1>

              <div />
            </div>
          ))}
        </div>
      </div>
      <Background />
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(OnlineUsers);

// {users.first_name + " " + users.last_name}
//// filter the ones i love and the ones i hate

//
// <div id="onlineUsers_container">
//   <Background />
//
//   <div id="friend_profile_container">
//     <h1 id="biger_text">hello</h1>
//   </div>
// </div>;
