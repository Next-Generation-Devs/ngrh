/**
 * @typedef {Object} DefaultOptions
 * @prop {'alphanumeric'} [charset]
 * @prop {32} [length]
 * @prop {5} [amount]
 * @prop {'individual'} [type]
 */

/**
 * @callback GetDefaultOptions
 * @return {DefaultOptions}
 */

/**
 * @typedef {Object} Options
 * @prop {('alphanumeric' | 'numeric' | 'alphabetic' | 'hex' | 'binary' | 'octal')} [charset] - the set that you want the random string made of.
 * @prop {number} [length] - the length of the random string
 * @prop {number} [amount] - the amount of the object keys or the array length of how much random string you want to create (use this with "array" and "object" types).
 * @prop {('individual' | 'object' | 'array')} [type] - the type of the return item you want to get from the generate function (if you choose array or object you can choose how big you want them by passing the amount prop).
 */

/**
 * @callback Generate
 * @return {string}
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {Generate} generate - a function to create the random string, object or array depends on the options you gave the hook.
 */

/**
 * @callback GetSet
 * @param {('alphanumeric' | 'numeric' | 'alphabetic' | 'hex' | 'binary' | 'octal')} charset - the char set that could be one of the standarts or a custom one.
 * @return {string}
 */

/**
 * @callback useRandom
 * @param {number | Options} options - the options of the random value you want the generate function to generate upon them.
 * @return {ReturnObject}
 */

export {};
