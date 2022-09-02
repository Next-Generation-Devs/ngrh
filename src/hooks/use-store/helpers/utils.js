import { GlobalStore } from "./global-store";
import * as types from "./types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.InitState}
 */

export const initState = (key, state) => {
  const storedData = GlobalStore.get(key);
  if (storedData) {
    return storedData;
  } else {
    GlobalStore.set(key, state);
    GlobalStore.onSetGlobal(key, state);
    return state;
  }
};
