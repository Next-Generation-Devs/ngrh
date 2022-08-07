import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

let socket = null;

/**
 * This hook allows you to use socket.io socket object easily with react.
 * @param {string} serverUrl - the url of the server where your server socket is working.
 * @param {import("socket.io-client").ManagerOptions} [options={}] - the options of the socket.
 * @param {Function} [onConnect] - a callback function that run on socket connection.
 * @param {Function} [onDisconnect] - a callback function that run on socket disconnection.
 * @returns {{socketRef: import("react").RefObject, isConnecting: boolean, isDisconnected: boolean}}
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
