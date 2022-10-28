import { useCallback, useReducer } from "react";
import {
  UseGlobalStore,
  UseGlobalStoreReturnObject,
} from "types/useStoreTypes";
import { GlobalStore } from "./helpers/global-store";
import reducer from "./helpers/reducer";

export const useGlobalStore: UseGlobalStore = () => {
  const [store, dispatch] = useReducer(
    reducer,
    Object.fromEntries(GlobalStore)
  );

  GlobalStore.onSetGlobal = useCallback((key, state) => {
    dispatch({ type: "MUTATE_KEY", key, state });
  }, []);

  const updateStoreData: UseGlobalStoreReturnObject["updateStoreData"] =
    useCallback((key, state) => {
      GlobalStore.set(key, state);
      GlobalStore.onSet(key, state);
      dispatch({ type: "MUTATE_KEY", key, state });
    }, []);

  return {
    store,
    updateStoreData,
  };
};
