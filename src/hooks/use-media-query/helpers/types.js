/**
 * @callback DoCompare
 * @param {Window} - the window object.
 * @param {Options} - the options of the hook.
 * @return {boolean}
 */

/**
 * @typedef {Object} DefaultOptions
 * @prop {Infinity} maxWidth
 * @prop {0} minWidth
 */

/**
 * @callback GetDefaultOptions
 * @return {DefaultOptions}
 */

/**
 * @typedef {Object} Options
 * @prop {number} [minWidth] - the minimum width in pixels of the scren you want the value to be true on (_defaults to 0_).
 * @prop {number} [maxWidth] - the maximum width in pixels of the scren you want the value to be true on (_defaults to [Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)_).
 */

/**
 * @callback useMediaQuery
 * @param {Options} [options] - the option for the size you want to calculate.
 * @return {boolean}
 */

export {};
