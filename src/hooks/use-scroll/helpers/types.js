/* eslint-disable no-unused-vars */
import { RefObject } from "react";

/**
 * @typedef {Object} DefaultOptions
 * @prop {null} customRef
 * @prop {{x:false,y:true}} scrollTypes
 */

/**
 * @callback GetDefaultOptions
 * @return {DefaultOptions}
 */

/**
 * @typedef {Object} ScrollTypes
 * @prop {boolean} x - enable getting scroll horizontal value (_defaults to `false`_).
 * @prop {boolean} y - enable getting scroll vertical value (_defaults to `true`_).
 */

/**
 * @typedef {Object} Options
 * @prop {ScrollTypes} [scrollTypes] - object contains booleans determins which values you'll get.
 * @prop {RefObject<HTMLElement>} [customRef] - if you want to get specific element's scroll set this prop to that element's ref (_defaults to `null`_).
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {number} scroll_x - the horizontal scroll value of the window or the customref.
 * @prop {number} scroll_y - the vertical scroll value of the window or the customref.
 */

/**
 * @callback useScroll
 * @param {Options} [options] - set custom options.
 * @return {ReturnObject} ```{ scroll_x, scroll_y}```
 */

export {};
