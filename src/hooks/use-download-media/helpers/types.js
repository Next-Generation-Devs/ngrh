/**
 * @typedef {Files}
 * @prop {string} id - the id of the file.
 * @prop {} chunks - the downloaded chunks.
 * @prop {string} fileName - the name of the file.
 * @prop {number} loading - the downloading state.
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {Download} download - a function used to download sources to browser and from there will be ready to download locally.
 * @prop {GetLoadingById} getLoadingById - gets the download progress.
 * @prop {Array<Files>} files - the files array.
 * @prop {DonwloadToLocal} donwloadToLocal - a function used to download sources locally.
 */

/**
 * @callback useDownloadMedia
 * @return {ReturnObject} ```{ donwload, getLoadingById, files , VoidFunction }```
 */

/**
 * @typedef {Object} downloadOptions
 * @prop {string} url - the url of the source.
 * @prop {string} fileName - a name to the downloaded file.
 * @prop {string} id - an id given to the downloaded file to get download progress.
 */

/**
 * @callback Download
 * @param {downloadOptions} options - the options of the download function.
 * @return {Promise<void>}
 */

/**
 * @callback DonwloadToLocal
 * @param {string} id - the id of the downloaded file.
 * @return {void}
 */

/**
 * @callback GetLoadingById
 * @param {string} id - the id of the downloaded file.
 * @return {number}
 */

export {};
