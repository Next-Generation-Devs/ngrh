/**
 * @param {string} key the fetch key
 * @returns {string} the url
 */

export const getURL = (key) => key.replace(/\$fetch_/g, "");
