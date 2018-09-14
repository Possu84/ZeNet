/////ES 5/////// WAY //////////

export function reducer(state = {}, action) {
  if (action.type == "RECEIVE_FRIENDS_WANNABES") {
    return Object.assign({}, state, {
      friendsandwanabees: action.friendsandwanabees
    });
  }

  /////////ES 6///////////// WAY///////////
  if (action.type == "ACCEPT_FRIEND_REQUEST") {
    const user = { ...state.user, bio: action.bio };
    return { ...state, user };
  }
  if (action.type == "DELETE_FRIEND") {
    const user = { ...state.user, bio: action.bio };
    return { ...state, user };
  }
  return state;
}
