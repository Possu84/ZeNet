import axios from "./axios";

export function getFriendsAndWanabes() {
  return axios.get("/get-friends-and-wanabes").then(result => {
    return {
      // remeber that return is whitespace sensitive. The next thing alway after one space!!!!!!!!!!!
      type: "RECEIVE_FRIENDS_WANNABES",
      friendsandwanabees: result.data /// this is now accessible from reducer
    };
  });
}

export function acceptFriendRequest(id) {
  return axios.post("/confirm-friend-request", { id }).then(result => {
    console.log("accept friend");
    return {
      // remeber that return is whitespace sensitive. The next thing alway after one space!!!!!!!!!!!
      type: "ACCEPT_FRIEND_REQUEST",
      id: id
    };
  });
}

export function unfriend(id) {
  return axios.post("/cancel-delete-request", { id }).then(result => {
    return {
      // remeber that return is whitespace sensitive. The next thing alway after one space!!!!!!!!!!!
      type: "DELETE_FRIEND",
      id: id
    };
  });
}

export function onlineUsers(users) {
  console.log("loggin users in action", users.rows);
  return {
    type: "GET_ONLINE_USERS",
    users: users.rows
  };
}

export function userLeft(data) {
  console.log("userLeft");
  // the function in its self is the action creator
  return {
    //// the obj is the "action"
    type: "USER_LEFT",
    disconnectedUser: data
  };
}

export function userJoined(data) {
  console.log("user joined in action", data);
  return {
    type: "NEW_USER_JOINED",
    newUser: data
  };
}

export function getChatMessages(data) {
  return axios.get("/get-messages").then(data => {
    console.log("in get messages actions results:", data);
    return {
      type: "GET_MESSAGES",
      msg: data.data
    };
  });
}

export function newChatMessage(msg) {
  console.log("in get messages actions results:", msg);
  return {
    type: "GET_NEW_MESSAGE",
    msg: msg
  };
}

export function newFriendRequestNotification(data) {
  console.log("in actions new friend reques notification");
  return {
    type: "FRIEND_REQUEST_NOTIFICATION",
    data: data
  };
}

export function closeTheNotification() {
  return {
    type: "CLOSE_NOTIFICATION"
  };
}
