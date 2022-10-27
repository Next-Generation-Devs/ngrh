import useSocket from "hooks/use-socket";
import { SocketProviderProps } from "types/useSocketTypes";
import SocketContext from "./Context";

const SocketProvider = ({
  children,
  socketURL,
  onConnect,
  onDisconnect,
  socketOptions,
}: SocketProviderProps) => {
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
