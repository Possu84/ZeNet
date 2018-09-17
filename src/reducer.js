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
    let newFriend;
    let newArray;

    for (let i = 0; i < state.friendsandwanabees.length; i++) {
      /// looping throught the responce
      if (state.friendsandwanabees[i].id == action.id) {
        /// checking if the id matches with the ones database
        newFriend = { ...state.friendsandwanabees[i], status: 0 }; /// copying the "oldfriend" then cahnging the status to 2
        newArray = [...state.friendsandwanabees]; //// copy the old array
        newArray[i] = newFriend; /// replaces the old one wit new array
        return {
          ...state,
          friendsandwanabees: newArray
        };
      }
    }
  }
  if (action.type == "GET_ONLINE_USERS") {
    let newFriend;
    let newArray;

    for (let i = 0; i < state.users.length; i++) {
      /// looping throught the responce
      if (state.users[i].id == action.id) {
        /// checking if the id matches with the ones database
        newFriend = { ...state.users[i] }; /// copying the "oldfriend" then cahnging the status to 2
        newArray = [...state.users]; //// copy the old array
        newArray[i] = newFriend; /// replaces the old one wit new array
        return {
          ...state,
          friendsandwanabees: newArray
        };
      }
    }
  }

  return state;
}
