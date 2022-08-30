/**
 * @typedef {Object} HookFiles
 * @prop {string} id - the id of the file.
 * @prop {Uint8Array} chunks - the downloaded chunks.
 * @prop {string} fileName - the name of the file.
 * @prop {number} loading - the downloading state.
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {Download} download - a function used to download sources to browser and from there will be ready to download locally.
 * @prop {GetLoadingById} getLoadingById - gets the download progress.
 * @prop {Array<HookFiles>} files - the files array.
 * @prop {DownloadToLocal} downloadToLocal - a function used to download sources locally.
 */

/**
 * @callback useDownloadMedia
 * @return {ReturnObject} ```{ donwload, getLoadingById, files , downloadToLocal }```
 */

/**
 * @typedef {Object} downloadOptions
 * @prop {string} url - the url of the source.
 * @prop {string} fileName - the name of the file (should include the extension).
 * @prop {string} id - the id to identify the file (used in `getLoadingById` and `downloadToLocal`).
 * @prop {boolean} withAutoDownload - a flag to determine if the file will be downloaded automatically after being downloaded to the borwser or not (_defaults to false_).
 */

/**
 * @callback Download
 * @param {downloadOptions} options - the options of the download function.
 * @return {Promise<void>}
 */

/**
 * @callback DownloadToLocal
 * @param {string} id - the id of the downloaded file.
 * @return {void}
 */

/**
 * @callback GetLoadingById
 * @param {string} id - the id of the downloaded file.
 * @return {number}
 */

export {};
