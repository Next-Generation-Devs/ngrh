import * as types from "./types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.GetDefaultFunctions}
 */

export const getDefaultFunctions = () => {
  return {
    didMount: () => {},
    didUpdate: () => {},
    willUnmount: () => {},
  };
};
