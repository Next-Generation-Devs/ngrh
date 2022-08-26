import { getSet } from "./charsets";
import * as types from "./types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.GetDefaultOptions}
 */

export const getDefaultOptions = () => {
  return {
    type: "individual",
    length: 32,
    charset: getSet("alphanumeric"),
    amount: 5,
  };
};
