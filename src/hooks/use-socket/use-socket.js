import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

let socket = null;

/**
 * @type {types.useSocket}
 */

const useSocket = (
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

export default useSocket;
