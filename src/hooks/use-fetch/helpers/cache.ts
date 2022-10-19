import { GlobalState } from "./global-state";
import { revalidateAllKeys } from "./mutate";

import type {
  Cache,
  CacheRecord,
  InitCache,
  GetCache,
  SetCache,
  InitFocus,
} from "types/useFetchTypes";

const getCache: GetCache = (key) => {
  const cache = GlobalState.get("cache") as Cache;
  return cache.get(key) as CacheRecord;
};

const setCache: SetCache = (key, value) => {
  const cache = GlobalState.get("cache") as Cache;
  cache.set(key, value);
  if (!value.isValidating) value.onMutate();
};

const initFocus: InitFocus = (callback) => {
  window.addEventListener("focus", callback);
  return () => {
    window.removeEventListener("focus", callback);
  };
};

export const initCache: InitCache = () => {
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
