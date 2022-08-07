import React from "react";
import { useSocket } from ".";
import SocketContext from "./Context";
import PropTypes from "prop-types";

/**
 * @typedef {import("socket.io-client").ManagerOptions} ManagerOptions
 */

/**
 * @typedef {object} Props
 * @property {string} socketURL - the url of the server where your server socket is working.
 * @property {ManagerOptions} [socketOptions={}] - the options of the socket.
 * @property {Function} [onConnect] - a callback function that run on socket connection.
 * @property {Function} [onDisconnect] - a callback function that run on socket disconnection.
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement} The Provider.
 */

const SocketProvider = ({
  children,
  socketURL,
  onConnect,
  onDisconnect,
  socketOptions,
}) => {
  const { socketRef, isConnecting, isDisconnected } = useSocket(
    socketURL,
    socketOptions,
    onConnect,
    onDisconnect
  );
  return (
    <SocketContext.Provider value={{ socketRef, isConnecting, isDisconnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

SocketProvider.propTypes = {
  socketURL: PropTypes.string.isRequired,
  socketOptions: PropTypes.object,
  children: PropTypes.any.isRequired,
  onConnect: PropTypes.func,
  onDisconnect: PropTypes.func,
};
