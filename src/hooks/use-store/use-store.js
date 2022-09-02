import { useCallback, useState } from "react";
import { GlobalStore } from "./helpers/global-store";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars
import { initState } from "./helpers/utils";

/**
 * @type {types.useStore}
 */

export const useStore = (key, initialState = null) => {
  const [state, set] = useState(initState(key, initialState));

  const setState = useCallback(
    (state) => {
      GlobalStore.set(key, state);
      GlobalStore.onSetGlobal(key, state);
      set(state);
    },
    [key]
  );

  GlobalStore.onSet = useCallback(
    (k, state) => {
      if (k === key) {
        set(state);
      }
    },
    [key]
  );

  return { state, setState };
};
