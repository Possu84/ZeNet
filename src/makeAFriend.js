let buttonText = "make a friend request";

if (data) {
  if (data.status == 2) {
    buttonText = " end friendship";
  } else if (data.status == 1) {
    if ((this.props.otherUserId = data.sender)) {
    }
  }
}
