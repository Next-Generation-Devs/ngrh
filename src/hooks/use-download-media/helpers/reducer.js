import * as types from "./types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.Reducer}
 */

export const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_LOADING": {
      const { id, fileName, chunks, loading } = action;
      return [...state, { id, chunks, fileName, loading }];
    }
    case "UPDATE_LOADING": {
      return state.map((el) => {
        if (el.id === action.id) {
          return { ...el, loading: action.loading };
        } else {
          return el;
        }
      });
    }

    case "UPDATE_CHUNKS": {
      return state.map((el) => {
        if (el.id === action.id) {
          return { ...el, chunks: action.chunks };
        } else {
          return el;
        }
      });
    }
    default: {
      return state;
    }
  }
};
