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
 * @callback GenerateRandom
 * @param {number} length - the length of the word.
 * @param {string} charset - the charset of the generated word.
 * @return {string}
 */

/**
 * @typedef {Object} Options
 * @prop {('alphanumeric' | 'numeric' | 'alphabetic' | 'hex' | 'binary' | 'octal')} [charset] - the group of the characters the word will be created from. We provided some of the popular charsets to use but still you can provide your own custom charset (_defaults to `"alphanumeric"`_).
 * @prop {number} [length] - the length of the random string (_defaults to `32`_).
 * @prop {number} [amount] - if the type of the random string is selected as array or object then this prop determins the size of that collection (_defaults to `5`_).
 * @prop {('individual' | 'object' | 'array')} [type] - could be individual, object or array and it determens the return type of the generate function so it could be a single word or a collection of words (_defaults to `"individual"`_).
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
 * @return {ReturnObject} ```{ generate }```
 */

export {};
