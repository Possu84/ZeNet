import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFriendsAndWanabes, acceptFriendRequest, unfriend } from "./actions";

class FriendsAndFrenemies extends React.Component {
  componentDidMount() {
    console.log("mount success");
    this.props.dispatch(getFriendsAndWanabes());
  }

  render() {
    ///// this makes sure that the render does not do nothing before return data is back and defind
    if (!this.props.friends) {
      return null;
    }
    if (!this.props.wanabees) {
      return null;
    }
    console.log("logging this.props", this.props);

    return (
      <div>
        <div>
          <h1>Friends</h1>
          {this.props.friends.map(friend => {
            return (
              <div id="profile_container_friends">
                <img id="picInProfile" src={friend.picurl} /> <br />
                {friend.first_name} <br />
                {friend.last_name}
              </div>
            );
          })}
        </div>
        <div>
          <h1>Frenemies</h1>
          {this.props.wanabees.map(wanabees => {
            return (
              <div id="profile_container_wanabees">
                <img id="picInProfile" src={wanabees.picurl} /> <br />
                {wanabees.first_name} <br />
                {wanabees.last_name}
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

// <nav>
//   <Link to="/hot">See who&apos;s hot</Link>
//   <Link to="/not">See who&apos;s not</Link>
// </nav>
//
