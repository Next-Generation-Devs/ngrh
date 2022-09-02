import { GlobalState } from "./global-state";
import * as types from "./types"; // eslint-disable-line no-unused-vars
import { revalidateAllKeys } from "./mutate";

/**
 * @type {types.GetCache}
 */

const getCache = (key) => {
  const cache = GlobalState.get("cache");
  return cache.get(key);
};

/**
 * @type {types.SetCache}
 */

const setCache = (key, value) => {
  const cache = GlobalState.get("cache");
  cache.set(key, value);
  if (!value.isValidating) value.onMutate();
};

const initFocus = (callback) => {
  window.addEventListener("focus", callback);
  return () => {
    window.removeEventListener("focus", callback);
  };
};

/**
 * @type {types.InitCache}
 */

export const initCache = () => {
  let unmount = () => {};
  if (!GlobalState.has("cache")) {
    GlobalState.set("cache", new Map());
    const releaseFocus = initFocus(revalidateAllKeys);
    unmount = () => {
      releaseFocus && releaseFocus();
    };
  }
  return [getCache, setCache, unmount];
};
