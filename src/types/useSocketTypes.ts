import { MutableRefObject } from "react";
import { ManagerOptions, Socket } from "socket.io-client";

export interface UseSocketReturnObject {
  /** the ref to the socket object (see more details [here](https://socket.io/docs/v4/client-api/#socket)). */ socketRef: MutableRefObject<Socket | null>;
  /** state indicates the connecting stage of the socket. */ isConnecting: boolean;
  /** state detects when the socket is disconnected. */ isDisconnected: boolean;
}

export type UseSocket = (
  /** the url of the server where your server socket is working. */ serverUrl: string,
  /** the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)). */ options?: Partial<ManagerOptions>,
  /** a callback function that run on socket connection. */ onConnect?: VoidFunction,
  /** a callback function that run on socket disconnection. */ onDisconnect?: VoidFunction
) => UseSocketReturnObject;

export interface SocketProviderProps {
  children: JSX.Element | JSX.Element[];
  /** the url of the server where your server socket is working. */ socketURL: string;
  /** a callback function that run on socket connection. */ onConnect: VoidFunction;
  /** a callback function that run on socket disconnection. */ onDisconnect: VoidFunction;
  /** the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)). */ socketOptions: Partial<ManagerOptions>;
}
