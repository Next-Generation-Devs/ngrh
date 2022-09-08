/* eslint-disable no-unused-vars */
import { RefObject } from "react";

/**
 * @typedef {Object} DefaultOptions
 * @prop {VoidFunction} callback
 * @prop {{}} observerOptions
 */

/**
 * @callback GetDefaultOptions
 * @return {DefaultOptions}
 */

/**
 * @typedef {Object} Options
 * @prop {IntersectionObserverCallback} callback - a callback function hooked to the `observer.observe` (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)).
 * @prop {IntersectionObserverInit} observerOptions - the observer options (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)).
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {RefObject<IntersectionObserver>} observer - a ref for the observer for custom usage.
 */

/**
 * @callback useInterSectionObserver
 * @param {Array<RefObject<HTMLElement>> | RefObject<HTMLElement> | string} selector - the selector of the elements to observe. Can be a ref, array of refs or a css selector.
 * @param {Options} [options] - the options of the hook.
 * @return {ReturnObject}
 */

export {};
