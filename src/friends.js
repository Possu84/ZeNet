import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFriendsAndWanabes, acceptFriendRequest, unfriend } from "./actions";
import Background from "./background";

class FriendsAndFrenemies extends React.Component {
  componentDidMount() {
    this.props.dispatch(getFriendsAndWanabes());
  }

  render() {
    ///// this makes sure that the render does not do nothing before return data is back and defined
    if (!this.props.friends) {
      return null;
    }
    if (!this.props.wanabees) {
      return null;
    }

    return (
      <div>
        <Background />
        <div id="onlineUsers_container">
          {this.props.friends.map(friends => {
            return (
              <div id="friend_profile_container">
                <img
                  onClick={() => {
                    this.props.dispatch(unfriend(friends.id));
                  }}
                  id="picInProfile_friends"
                  src={friends.picurl}
                />
                <p id="friends_page_text"> remove </p>
              </div>
            );
          })}
        </div>

        <div id="frenemies_container">
          {this.props.wanabees.map(wanabees => {
            return (
              <div id="profile_container_wanabees">
                <img
                  onClick={() => {
                    this.props.dispatch(acceptFriendRequest(wanabees.id));
                  }}
                  id="picInProfile_friends"
                  src={wanabees.picurl}
                />{" "}
                <p id="friends_page_text"> accept </p>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    friends:
      state.friendsandwanabees &&
      state.friendsandwanabees.filter(user => user.status == 2),
    wanabees:
      state.friendsandwanabees &&
      state.friendsandwanabees.filter(user => user.status == 1)
  };
};

//// filter the ones i love and the ones i hate

export default connect(mapStateToProps)(FriendsAndFrenemies);

// <button
//   onClick={() => {
//     this.props.dispatch(acceptFriendRequest(wanabees.id));
//   }}
// >
//   {" "}
//   Accept{" "}
// </button>

// <button
//   onClick={() => {
//     this.props.dispatch(unfriend(friends.id));
//   }}
// >
//   {" "}
//   terminate{" "}
// </button>

// <nav>
//   <Link to="/hot">See who&apos;s hot</Link>
//   <Link to="/not">See who&apos;s not</Link>
// </nav>

// {wanabees.first_name} <br />
// {wanabees.last_name}
//

//
// <h1 id="biger_text">Friend</h1>
// <h1 id="biger_text">
//   {friends.first_name}
//   {friends.last_name}
// </h1>
