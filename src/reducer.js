/////ES 5/////// WAY //////////

export function reducer(state = {}, action) {
  if (action.type == "RECEIVE_FRIENDS_WANNABES") {
    return Object.assign({}, state, {
      friendsandwanabees: action.friendsandwanabees
    });
  }

  /////////ES 6///////////// WAY///////////
  if (action.type == "ACCEPT_FRIEND_REQUEST") {
    console.log("in reducer", state);
    let newFriend;
    let newArray;

    for (let i = 0; i < state.friendsandwanabees.length; i++) {
      /// looping throught the responce
      if (state.friendsandwanabees[i].id == action.id) {
        /// checking if the id matches with the ones database
        newFriend = { ...state.friendsandwanabees[i], status: 2 }; /// copying the "oldfriend" then cahnging the status to 2
        newArray = [...state.friendsandwanabees]; //// copy the old array
        newArray[i] = newFriend; /// replaces the old one wit new array
        return {
          ...state,
          friendsandwanabees: newArray
        };
      }
    }
  }

  if (action.type == "DELETE_FRIEND") {
    console.log("delete friend", state);

    state = {
      ...state,
      users: state.users && state.users.filter(user => user.id != action.delete)
    };
  }

  if (action.type == "GET_ONLINE_USERS") {
    state = {
      //// three dots is spread operator and it copies the
      ...state,
      users: action.users
    };
  }

  if (action.type == "USER_LEFT") {
    console.log("inside theuserleft reducer: ", state);

    const onlineUsersUpToDate = state.users.filter(user => {
      return user.id != action.disconnectedUser;
    });
    state = {
      ...state,
      users: onlineUsersUpToDate
    };
  }
  if (action.type == "NEW_USER_JOINED") {
    state = {
      //// three dots is spread operator and it copies the
      ...state,
      users: [...state.users, action.newUser]
    };
  }
  if (action.type == "GET_MESSAGES") {
    console.log("in reducer GET MESSAGES");
    return {
      ...state,
      msg: action.msg
    };
  }
  if (action.type == "GET_NEW_MESSAGE") {
    console.log("in reducer GET MESSAGES");
    return {
      ///// here we are copying and adding
      ...state,
      msg: [...state.msg, action.msg]
    };
  }
  if (action.type == "FRIEND_REQUEST_NOTIFICATION") {
    console.log("in frn reducer");
    return {
      ...state,
      notification: true
    };
  }

  if (action.type == "CLOSE_NOTIFICATION") {
    console.log("in close note reducer");
    return {
      ...state,
      notification: false
    };
  }

  return state;
}
