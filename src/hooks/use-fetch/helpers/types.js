/**
 * @callback FetchProvider
 * @param {string} key
 * @return {Promise<any> | any}
 */

/**
 * @typedef {Object} Configurations
 * @prop {FetchProvider} [fetchProvider]
 * @prop {boolean} [revalidateOnFocus]
 */

/**
 * @callback DefaultFetchProvider
 * @param {string} key
 * @return {Promise<any>}
 */

/**
 * @typedef {Object} DefaultConfigurations
 * @prop {DefaultFetchProvider} fetchProvider
 * @prop {boolean} revalidateOnFocus
 */

/**
 * @callback KeyMutate
 * @param {Promise<any> | any} [data]
 * @param {MutateOptions} [options]
 * @return {Promise<any>}
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {any} data
 * @prop {any} error
 * @prop {boolean} loading
 * @prop {KeyMutate} mutate
 */

/**
 * @typedef {Map<string,any>} GlobalState
 */

/**
 * @typedef {Object} CacheRecord
 * @prop {any} data
 * @prop {VoidFunction} onMutate
 * @prop {Configurations} config
 * @prop {any} error
 * @prop {boolean} isValidating
 */

/**
 * @typedef {Map<string,CacheRecord>} Cache
 */

/**
 * @callback GetCache
 * @param {string} key
 * @return {CacheRecord}
 */

/**
 * @callback SetCache
 * @param {string} key
 * @param {CacheRecord} value
 * @param {boolean} isError
 * @return {void}
 */

/**
 * @typedef {Object} MutateOptions
 * @prop {boolean} [revalidate]
 * @prop {Object} [tempData]
 * @prop {boolean} [rollbackOnError]
 */

/**
 * @typedef {Object} MutateDefaultOptions
 * @prop {boolean} revalidate
 * @prop {undefined} tempData
 * @prop {boolean} rollbackOnError
 */

/**
 * @callback Mutate
 * @param {string} key
 * @param {Promise<any> | any} [data]
 * @param {MutateOptions} [options]
 * @return {Promise<any>}
 */

export {};
