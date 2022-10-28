import { InitState } from "types/useStoreTypes";
import { GlobalStore } from "./global-store";

export const initState: InitState = (key, state) => {
  const storedData = GlobalStore.get(key);
  if (storedData) {
    return storedData;
  } else {
    GlobalStore.set(key, state);
    GlobalStore.onSetGlobal(key, state);
    return state;
  }
};
