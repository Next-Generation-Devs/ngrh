import { useEffect, useRef, useState, RefObject } from "react";
import { io, Socket, ManagerOptions } from "socket.io-client";

let socket = null;

/**
 * @typedef {object} ReturnObject
 * @property {RefObject<Socket>} socketRef
 * @property {boolean} isConnecting
 * @property {boolean} isDisconnected
 */

/**
 * @param {string} serverUrl - the url of the server where your server socket is working.
 * @param {ManagerOptions} [options={}] - the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)).
 * @param {Function} [onConnect] - a callback function that run on socket connection.
 * @param {Function} [onDisconnect] - a callback function that run on socket disconnection.
 * @returns {ReturnObject} ```{ socketRef, isConnecting, isDisconnected }```
 */

export const useSocket = (
  serverUrl,
  options = {},
  onConnect = () => {},
  onDisconnect = () => {}
) => {
  const socketRef = useRef(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      socket = io(serverUrl, {
        ...options,
      });
      socket.on("connect", () => {
        socketRef.current = socket;
        setIsConnecting(false);
        onConnect();
      });
      socket.on("disconnect", () => {
        setIsDisconnected(true);
        onDisconnect();
      });
    }
    return () => {
      socket.disconnect();
      socket = null;
      socketRef.current = null;
    };
  }, []);

  return {
    socketRef,
    isConnecting,
    isDisconnected,
  };
};

import Context from "./Context";
import SocketProvider from "./SocketProvider";
export { Context, SocketProvider };
