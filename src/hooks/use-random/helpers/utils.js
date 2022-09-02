import * as types from "./types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.GenerateRandom}
 */

export const generateRandom = (length, charset) => {
  const now = new Date().getMilliseconds();
  const charLen = charset.length;
  let str = "";
  Array.from({ length }).forEach(() => {
    const seed = Math.ceil(now * Math.random());
    const index = charLen - (seed % charLen) - 1;
    str += charset[index];
  });
  return str;
};
