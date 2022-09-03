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
 * @prop {number} [minWidth] - the minimum width in pixels of the scren you want the value to be true on.
 * @prop {number} [maxWidth] - the maximum width in pixels of the scren you want the value to be true on.
 */

/**
 * @callback useMediaQuery
 * @param {Options} [options] - the option for the size you want to calculate.
 * @return {boolean}
 */

export {};
