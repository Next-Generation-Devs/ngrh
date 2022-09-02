/**
 * @callback useFetch
 * @param {string} key - any string if you'll use your own `fetchProvider` or a valid api endpoint if you will to use the default provider of the hook.
 * @param {Configurations} [options={}] - the options of the useFetch hook.
 * @return {ReturnObject} ```{data, error, loading, mutate}```
 */

/**
 * @callback FetchProvider
 * @param {string} key - the key used in the hook.
 * @return {Promise<any> | any}
 */

/**
 * @typedef {Object} Configurations
 * @prop {FetchProvider} [fetchProvider] - a function that takes the key as a parameter and can return the data itself or a Promise the resolve the data (_defaults to a built-in provider uses [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)_).
 * @prop {boolean} [revalidateOnFocus] - a boolean to indicate if the data of this key will revalidate on window focus (_defaults to `true`_).
 */

/**
 * @callback DefaultFetchProvider
 * @param {string} key - the key used in the hook (should be valid endpoint).
 * @return {Promise<any>}
 */

/**
 * @typedef {Object} DefaultConfigurations
 * @prop {DefaultFetchProvider} fetchProvider
 * @prop {true} revalidateOnFocus
 */

/**
 * @callback GetDefaultConfig
 * @return {DefaultConfigurations}
 */

/**
 * @callback KeyMutate
 * @param {Promise<any> | any} [data] - the data you want to replace your current data with (could be a promise or normal).
 * @param {MutateOptions} [options] - options: the options of the mutate function.
 * @return {Promise<any>}
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {any} data - the data resolved by the fetchProvider.
 * @prop {any} error - the error thrown by fetchProvider if exists.
 * @prop {boolean} loading - a state to get the loading state of the data.
 * @prop {KeyMutate} mutate - a function to mutate the data either on the server or just locally.
 */

/**
 * @typedef {Map<string,any>} GlobalState
 */

/**
 * @typedef {Object} CacheRecord
 * @prop {any} data - the cached data.
 * @prop {VoidFunction} onMutate - function get called on the data in the cache has changed.
 * @prop {Configurations} config - the final options of the useFetch.
 * @prop {any} error - the error thrown by fetchProvider if exists.
 * @prop {boolean} isValidating - a boolean that checks if the data in the cache is validating.
 */

/**
 * @typedef {Map<string,CacheRecord>} Cache
 */

/**
 * @callback GetCache
 * @param {string} key - the cache key
 * @return {CacheRecord}
 */

/**
 * @callback SetCache
 * @param {string} key - the cache key
 * @param {CacheRecord} value - the value to set.
 * @return {void}
 */

/**
 * @typedef {Object} MutateOptions
 * @prop {boolean} [revalidate] - a boolean to tell the function to revalidate the data from the server (or the cache) after mutate them (_defaults to `true`_).
 * @prop {Object} [tempData] - a temporary data to keep the state truthy and get rid of the loading states (_defaults to `null`_).
 * @prop {boolean} [rollbackOnError] - to get the cached data if the mutate or the revalidate is rejected (_Note that you'll not roll back to cached data on error if you provide a tempData and the cache system will use the tempData instead and defaults to `true`_).
 */

/**
 * @typedef {Object} MutateDefaultOptions
 * @prop {boolean} revalidate - true
 * @prop {undefined} tempData - null
 * @prop {boolean} rollbackOnError - true
 */

/**
 * @callback GetMutateDefaultOptions
 * @return {MutateDefaultOptions}
 */

/**
 * @callback RevalidateAllKeys
 * @return {void}
 */

/**
 * @callback Mutate
 * @param {string} key - the key of the data want to mutate.
 * @param {Promise<any> | any} [data] - the data you want to replace your current data with (could be a promise or normal).
 * @param {MutateOptions} [options] - the options of the mutate function.
 * @return {Promise<any>}
 */

/**
 * @callback Unmount
 * @return {void}
 */

/**
 * @callback InitCache
 * @return {[GetCache,SetCache,Unmount]}
 */

export {};
