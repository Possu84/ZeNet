import * as io from "socket.io-client"; ///// imports everything from socket io
import { onlineUsers, userLeft, userJoined, newChatMessage, getChatMessages, sendMessage, newFriendRequestNotification } from "./actions";

let socket;

export function getSocket(store) {
  // if not socket
  if (!socket) {
    socket = io.connect();

    /// we are listening the emit from index

    socket.on("onlineUsers", data => {
      store.dispatch(onlineUsers(data));
      // dispatches an action
    });

    socket.on("userLeft", data => {
      store.dispatch(userLeft(data));
    });

    socket.on("sendMessage", msg => {
        console.log("in socket send message", msg);
        // store.dispatch
    })


    socket.on("userJoined", data => {
      console.log("user joined at socket", data);
      store.dispatch(userJoined(data));
    });

    socket.on("getChatMessages", data => {
      store.dispatch(getChatMessages(data));

      console.log("at socket");
    });

    socket.on("newChatMessage", data => {
        console.log("at new message socket", data.message);
        store.dispatch(newChatMessage(data));
    });

    socket.on("friendRequestNotice", data => {
        console.log("at new message socket", data);
        store.dispatch(newFriendRequestNotification(data));
    });

  }
  return socket;
}
