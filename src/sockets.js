import * as io from "socket.io-client"; ///// imports everything from socket io

let socket;

export function getSocket(store) {
  // if not socket
  if (!socket) {
    socket = io.connect();
  }
  return socket;
}
