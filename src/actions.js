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
  console.log("loggin users in action", users);
  return {
    type: "GET_ONLINE_USERS",
    users: users
  };
}
