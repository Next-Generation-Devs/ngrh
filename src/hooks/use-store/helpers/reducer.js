import * as types from "./types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.Reducer}
 */

const reducer = (state, action) => {
  switch (action.type) {
    case "MUTATE_KEY":
      return {
        ...state,
        [action.key]: action.state,
      };
  }
};

export default reducer;
