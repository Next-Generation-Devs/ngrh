import { Ref } from "react"; // eslint-disable-line no-unused-vars

/**
 * @callback OnDragLeave
 * @param {DragEvent} event - the drag event.
 * @return {void}
 */

/**
 * @callback OnDragEnter
 * @param {DragEvent} event - the drag event.
 * @return {void}
 */

/**
 * @callback OnDragOver
 * @param {DragEvent} event - the drag event.
 * @return {void}
 */

/**
 * @callback OnDrop
 * @param {DragEvent} event - the drag event.
 * @return {void}
 */

/**
 * @typedef {Object} Options
 * @prop {string | Ref<HTMLElement> | Array<string> | Array<Ref<HTMLElement>>} selector - the selector of the zone that will be the drag & drop area. Could be an id or ref or array of ids and refs.
 * @prop {OnDragLeave} [onDragLeave] - function runs when the item dragged out an area.
 * @prop {OnDragEnter} [onDragEnter] - function runs when the item dragged in an area.
 * @prop {OnDragOver} [onDragOver] - function runs when the item is over an area.
 * @prop {OnDrop} [onDrop] - function runs when the item dropped on an area.
 */

/**
 * @callback useDragDrop
 * @param {Options} options - the options of the hook.
 * @return {void}
 */

export {};
