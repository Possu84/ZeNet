import axios from "./axios";

export function getFriendsAndWanabes() {
  console.log("firing up the friends and wanabees route");

  return axios.get("/get-friends-and-wanabes/").then(result => {
    console.log("logging result in actions", result.data);

    return {
      // remeber that return is whitespace sensitive. The next thing alway after one space!!!!!!!!!!!
      type: "RECEIVE_FRIENDS_WANNABES",
      friendsandwanabees: result.data /// this is now accessible from reducer
    };
  });
}

export function acceptFriendRequest(id) {
  return axios.post("/confirm-friend-request/").then(result => {
    return {
      // remeber that return is whitespace sensitive. The next thing alway after one space!!!!!!!!!!!
      type: "ACCEPT_FRIEND_REQUEST"
    };
  });
}

export function unfriend(id) {
  return axios.post("/confirm-friend-request/").then(result => {
    return {
      // remeber that return is whitespace sensitive. The next thing alway after one space!!!!!!!!!!!
      type: "ACCEPT_FRIEND_REQUEST"
    };
  });
}
