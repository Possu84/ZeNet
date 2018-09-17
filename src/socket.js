import * as io from "socket.io-client"; ///// imports everything from socket io
import { onlineUsers } from "./actions";

let socket;

export function getSocket(store) {
  console.log("logging store", store);
  // if not socket
  if (!socket) {
    socket = io.connect();

    /// we are listening the emit from index

    socket.on("onlineUsers", data => {
      store.dispatch(onlineUsers(data));
      // dispatches an action
    });
    socket.on("chatMessage", message => {
      store.dispatch(chatMessage(message));
    });
  }
  return socket;
}
