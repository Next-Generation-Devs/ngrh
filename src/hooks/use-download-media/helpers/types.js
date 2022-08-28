/* eslint-disable no-unused-vars */
// import { Socket, ManagerOptions } from "socket.io-client";
import { RefObject } from "react";

/**
 * @typedef {object} ReturnObject
 * @prop {VoidFunction} donwload
 * @prop {number} getLoadingById
 * @prop {Array} files
 * @prop {VoidFunction} donwloadToLocal
 */

/**
 * @callback useDownloadMedia
 * @return {ReturnObject} ```{ donwload, getLoadingById, files , VoidFunction }```
 */

/**
 * @typedef {object} downloadOptions
 * @prop {string} url
 * @prop {string} fileName
 * @prop {string} id
 */
/**
 * @callback download
 * @param {downloadOptions} options
 */

/**
 * @callback donwloadToLocal
 * @param {string} id
 */

/**
 * @callback getLoadingById
 * @param {string} id
 * @return {number}
 */

export {};
