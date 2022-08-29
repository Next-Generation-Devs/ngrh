/* eslint-disable no-unused-vars */
import { Socket, ManagerOptions } from "socket.io-client";
import { RefObject } from "react";

/**
 * @typedef {Object} scrollTypes
 * @prop {boolean} x -  allow to get Horizontal value , 'false' by defult
 * @prop {boolean} y -  allow to get Vertical value , 'true' by defult
 */

/**
 * @typedef {Object} options
 * @prop {scrollTypes} scrollTypes - to set scroll types (Vertical / Horizontal ) ,
 * @prop {RefObject} customRef - to return custom ref scroll values  , 'null' by defult
 */

/**
 * @callback useScroll
 * @param {options} options - set custom options.
 * @return {ReturnObject} ```{ scroll_x, scroll_y}```
 */

export {};
