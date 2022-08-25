/**
 * @callback SetState
 * @param {any} state
 * @return {void}
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {any} state
 * @prop {SetState} setState
 */

/**
 * @callback useStore
 * @param {string} key
 * @param {any} [initialState]
 * @return {ReturnObject}
 */

/**
 * @callback UpdateStoreData
 * @param {string} key
 * @param {any} state
 * @return {void}
 */

/**
 * @typedef {Object} GlobalStoreReturnObjcet
 * @prop {Object} store
 * @prop {UpdateStoreData}
 */

/**
 * @callback useGlobalStore
 * @return {GlobalStoreReturnObjcet}
 */

export {};
