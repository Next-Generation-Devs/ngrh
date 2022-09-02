/**
 * @callback SetState
 * @param {any} state - the new state
 * @return {void}
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {any} state - the current state.
 * @prop {SetState} setState - a function to change the current state.
 */

/**
 * @callback useStore
 * @param {string} key - a unique key to mark your state and be able to call it from the global store.
 * @param {any} [initialState] - the initial state for your stored data (use it when you initilaize your state for the first time, _it defaults to `null`_).
 * @return {ReturnObject} ```{state, setState}```
 */

/**
 * @callback UpdateStoreData
 * @param {string} key - the key of the stored data you want to update.
 * @param {any} state - the new state.
 * @return {void}
 */

/**
 * @typedef {Object} GlobalStoreReturnObjcet
 * @prop {Object} store - an object that holds all the stored data in the application.
 * @prop {UpdateStoreData} updateStoreData - a function to update a specific state someplace in the app.
 */

/**
 * @callback useGlobalStore
 * @return {GlobalStoreReturnObjcet} ```{store, updateStoreData}```
 */

/**
 * @typedef {Object} Action
 * @prop {string} key - the key of the state stored.
 * @prop {'MUTATE_KEY'} type - the action to produce.
 * @prop {any} state - the new state.
 */

/**
 * @callback Reducer
 * @param {any} state - the current state.
 * @param {Action} action - the action to dispatch on the state.
 * @return {any}
 */

/**
 * @callback InitState
 * @param {string} key - the key you want to give the data or the key of the previously stored data.
 * @param {any} state - if the state is new to the store then this is the initial data.
 * @return {any}
 */

export {};
