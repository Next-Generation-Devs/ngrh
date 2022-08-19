import React from "react";
import { useSocket } from ".";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars
import SocketContext from "./Context";
import PropTypes from "prop-types";

/**
 * @type {React.FC<types.ProviderProps>}
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
