/* eslint-disable no-unused-vars */
import { Socket, ManagerOptions } from "socket.io-client";
import { RefObject } from "react";

/**
 * @typedef {Object} ReturnObject
 * @prop {RefObject<Socket>} socketRef - the ref to the socket object (see more details [here](https://socket.io/docs/v4/client-api/#socket)).
 * @prop {boolean} isConnecting - state indicates the connecting stage of the socket.
 * @prop {boolean} isDisconnected - state detects when the socket is disconnected.
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
 * @typedef {Object} ProviderProps
 * @prop {string} socketURL - the url of the server where your server socket is working.
 * @prop {ManagerOptions} [socketOptions={}] - the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)).
 * @prop {Function} [onConnect] - a callback function that run on socket connection.
 * @prop {Function} [onDisconnect] - a callback function that run on socket disconnection.
 */

export {};
