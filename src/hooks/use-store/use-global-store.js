import { useCallback, useReducer } from "react";
import { GlobalStore } from "./helpers/global-store";
import reducer from "./helpers/reducer";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useGlobalStore}
 */

export const useGlobalStore = () => {
  const [store, dispatch] = useReducer(
    reducer,
    Object.fromEntries(GlobalStore)
  );

  GlobalStore.onSetGlobal = useCallback((key, state) => {
    dispatch({ type: "MUTATE_KEY", key, state });
  }, []);

  const updateStoreData = useCallback((key, state) => {
    GlobalStore.set(key, state);
    GlobalStore.onSet(key, state);
    dispatch({ type: "MUTATE_KEY", key, state });
  }, []);

  return {
    store,
    updateStoreData,
  };
};
