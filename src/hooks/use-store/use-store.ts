import { useCallback, useState } from "react";
import { UseStore } from "types/useStoreTypes";
import { GlobalStore } from "./helpers/global-store";
import { initState } from "./helpers/utils";

export const useStore: UseStore = (key, initialState) => {
  const [state, set] = useState<typeof initialState>(
    initState<typeof initialState>(key, initialState)
  );

  const setState: (state: typeof initialState) => void = useCallback(
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
