import * as io from "socket.io-client"; ///// imports everything from socket io
import { addAnimals } from "./actions";

let socket;

export function getSocket(store) {
  // if not socket
  if (!socket) {
    socket = io.connect();

    /// we are listening the emit from index
    socket.on("animals", data => {
      store.dispatch(addAnimals(data));
    });
    socket.on("onlineUsers", data => {
      // dispatches an action
    });
  }
  return socket;
}
