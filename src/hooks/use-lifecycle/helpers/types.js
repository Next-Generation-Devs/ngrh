/**
 * @typedef {Object} Functions
 * @prop {VoidFunction} didMount - a function that runs on initial component mounting.
 * @prop {VoidFunction} didUpdate - a function that runs on each component update.
 * @prop {VoidFunction} willUnmount - a function that runs when the component is unmounting.
 */

/**
 * @callback GetDefaultFunctions
 * @return {Functions}
 */

/**
 * @callback useLifecycle
 * @param {Functions} functions - the callbacks of the life cycle hooks.
 * @param {Array<any>} conditions - the conditions for that the didUpdate function will run onChange.
 */

export {};
