/* eslint-disable no-unused-vars */
import { Socket, ManagerOptions } from "socket.io-client";
import { RefObject } from "react";

/**
 * @typedef {object} ReturnObject
 * @prop {RefObject<Socket>} socketRef
 * @prop {boolean} isConnecting
 * @prop {boolean} isDisconnected
 */

/**
 * @callback useSocket
 * @param {string} serverUrl - the url of the server where your server socket is working.
 * @param {ManagerOptions} [options={}] - the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)).
 * @param {VoidFunction} [onConnect] - a callback function that run on socket connection.
 * @param {VoidFunction} [onDisconnect] - a callback function that run on socket disconnection.
 * @return {ReturnObject} ```{ socketRef, isConnecting, isDisconnected }```
 */

/**
 * @typedef {object} ProviderProps
 * @property {string} socketURL - the url of the server where your server socket is working.
 * @property {ManagerOptions} [socketOptions={}] - the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)).
 * @property {Function} [onConnect] - a callback function that run on socket connection.
 * @property {Function} [onDisconnect] - a callback function that run on socket disconnection.
 */

export {};
