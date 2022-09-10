/* eslint-disable no-unused-vars */
import { RefObject } from "react";

/**
 * @callback OnClickOutside
 * @param {MouseEvent} - the native mouse click event (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent).
 */

/**
 * @callback OnTouchOutside
 * @param {TouchEvent} - the native touch start event (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event)).
 */

/**
 * @typedef {Object} Options
 * @prop {OnClickOutside} onClickOutside - a function to call on click outside.
 * @prop {OnTouchOutside} onTouchOutside - a function to call on touch outside. You can ignore it if you want the same function to run on both events.
 */

/**
 * @callback useClickOutside
 * @param {RefObject<HTMLElement>} ref - the ref of the element to check if clicked outside of it.
 * @param {Options} options - options contains two functions to call on click outside.
 */

export {};
