import * as types from "./types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.DoCompare}
 */

export const doCompare = (window, options) => {
  return (
    window.innerWidth >= options.minWidth &&
    window.innerWidth < options.maxWidth
  );
};
