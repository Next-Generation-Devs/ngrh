import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UseSocket, UseSocketReturnObject } from "types/useSocketTypes";

let socket: Socket | null = null;

const useSocket: UseSocket = (
  serverUrl,
  options = {},
  onConnect = () => {},
  onDisconnect = () => {}
) => {
  const socketRef = useRef(null) as UseSocketReturnObject["socketRef"];
  const [isConnecting, setIsConnecting] =
    useState<UseSocketReturnObject["isConnecting"]>(true);
  const [isDisconnected, setIsDisconnected] =
    useState<UseSocketReturnObject["isDisconnected"]>(false);

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
      socket?.disconnect();
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
