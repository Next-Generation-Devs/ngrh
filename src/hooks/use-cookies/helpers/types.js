/**
 * @typedef {Object} CookiesObject
 */

/**
 * @callback GetCookies
 * @return {CookiesObject}
 */

/**
 * @typedef {Object} Options
 * @prop {number} maxAge - the age of the cookie in the browser in seconds. if null then the cookie will expire after closing the session of the browser.
 * @prop {string} path - the path the cookie available at (_defaults to `"/"`_).
 * @prop {string} domain - the domain the cookie available at (_defaults to the same domain of the document_).
 * @prop {Date} expires - the date that the cookie will expire (don't use it with `maxAge`).
 * @prop {boolean} secure - determine that cookie only be transmitted over secure protocol as https ([see more](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)).
 * @prop {"low"|"medium"|"high"} priority - when the client browser limit has been reached, this attribute determins which cookies should stay over others.
 * @prop {"strict"|"lax"|"none"} sameSite - prevents the browser from sending this cookie along with cross-site requests ([see more](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)).
 */

/**
 * @callback SetCookie
 * @param {string} name - the name of the cookie.
 * @param {string} value - the value of the cookie.
 * @param {Options} [options] - the options of setting the cookie.
 * @return {void}
 */

/**
 * @callback RemoveCookie
 * @param {string} name - the name of the cookie.
 * @return {void}
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {GetCookies} getCookies - returns all the cookie in the browser.
 * @prop {SetCookie} setCookie - set a cookie in the browser (don't use client side).
 * @prop {RemoveCookie} removeCookie - remove cookie from the browser.
 */

/**
 * @callback useCookies
 * @return {ReturnObject} ```{ getCookies, setCookie, removeCookie }```
 */

/**
 * @callback Parse
 * @param {string} cookie
 * @return {CookiesObject}
 */

/**
 * @callback Serialize
 * @param {string} name
 * @param {string} value
 * @param {Options} options
 * @return {void}
 */

export {};
