/* eslint-disable no-unused-vars */
import * as useRandomTypes from "hooks/use-random/helpers/types";

/**
 * @callback MoveItem
 * @param {number | string} currentSelector
 * @param {number | string} newSelector
 * @return {void}
 */

/**
 * @callback AddItem
 * @param {any} item
 * @param {number | string} [atSelector]
 * @return {void}
 */

/**
 * @callback AddItems
 * @param {Array<any>} items
 * @param {number | string} [atSelector]
 * @return {void}
 */

/**
 * @callback MapCallbackFunction
 * @param {any} item
 * @param {number} index
 * @param {Array<any>} array
 * @return {any}
 */

/**
 * @callback Map
 * @param {MapCallbackFunction} cb
 * @return {void}
 */

/**
 * @callback GetUUID
 * @param {number} index
 * @return {string}
 */

/**
 * @callback GetItem
 * @param {number | string} selector
 * @return {any}
 */

/**
 * @callback RemoveItem
 * @param {number | string} selector
 * @return {void}
 */

/**
 * @callback RemoveItems
 * @param {Array<number|string>} selectors
 * @return {void}
 */

/**
 * @callback GetSlice
 * @param {number | string} fromSelector
 * @param {number | string} toSelector
 * @return {Array<any>}
 */

/**
 * @callback ShuffleMainList
 * @return {Array<any>}
 */

/**
 * @callback GetShuffledList
 * @return {Array<any>}
 */

/**
 * @callback ResetList
 * @return {void}
 */

/**
 * @callback Swap
 * @param {number | string} firstSelector
 * @param {number | string} secondSelector
 * @return {void}
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {Array<any>} list
 * @prop {MoveItem} moveItem
 * @prop {AddItem} addItem
 * @prop {AddItems} addItems
 * @prop {Map} map
 * @prop {GetUUID} getUUID
 * @prop {RemoveItem} removeItem
 * @prop {RemoveItems} removeItems
 * @prop {GetItem} getItem
 * @prop {GetSlice} getSlice
 * @prop {ShuffleMainList} shuffleMainList
 * @prop {GetShuffledList} getShuffledList
 * @prop {ResetList} resetList
 * @prop {Swap} swap
 */

/**
 * @callback useDynamicList
 * @param {Array<any>} initialValue
 * @param {boolean} [withUUID]
 * @return {ReturnObject} ```return { list, moveItem, addItem, addItems, map, getUUID, removeItem, removeItems, getItem, getSlice, shuffleMainList, getShuffledList, resetList, swap }```
 */

/**
 * @callback DeepCopy
 * @param {Object | Array<any>} obj
 * @return {Object | Array<any>}
 */

/**
 * @callback IsValidIndex
 * @param {number} num
 * @return {boolean}
 */

/**
 * @callback InitialValueMapper
 * @param {Array<any>} initialValue
 * @param {useRandomTypes.Generate | Array<string>} uuidGetter
 * @return {Array<any>}
 */

export {};
