import { initCache } from "./cache";
import { GlobalState } from "./global-state";
import * as types from "./types"; // eslint-disable-line no-unused-vars
import { getURL } from "./utils";

/**
 * @return {types.MutateDefaultOptions}
 */

const getMutateDefaultOptions = () => {
  return { revalidate: true, tempData: undefined, rollbackOnError: true };
};

/**
 * @type {types.Mutate}
 */

export const mutate = async (key, dataPromise, opt) => {
  const defaultOptions = getMutateDefaultOptions();
  const options = Object.assign({}, defaultOptions, opt);
  const [get, set] = initCache();
  const cachedData = get(key);
  const {
    config: { fetchProvider },
  } = cachedData;
  if (options.tempData) {
    set(key, { ...cachedData, data: options.tempData, error: null });
  }
  if (dataPromise) {
    try {
      const result = await dataPromise;
      if (!opt.tempData) {
        set(key, {
          ...cachedData,
          data: result,
          error: null,
        });
      }
    } catch (err) {
      if (!opt.tempData) {
        set(key, {
          ...cachedData,
          data: opt.rollbackOnError ? cachedData.data : null,
          error: err,
        });
      }
    }
  }
  if (options.revalidate) {
    const url = getURL(key);
    try {
      const result = await fetchProvider(url);
      set(key, { ...cachedData, data: result, error: null });
    } catch (err) {
      set(key, {
        ...cachedData,
        data: opt.rollbackOnError ? cachedData.data : null,
        error: err,
      });
    }
  }
};

export const revalidateAllKeys = () => {
  const [get, set] = initCache();
  /**@type {types.Cache} */
  const cache = GlobalState.get("cache");
  cache.forEach(async (value, key) => {
    const {
      config: { fetchProvider, revalidateOnFocus },
    } = value;
    if (revalidateOnFocus) {
      const cachedData = get(key);
      const url = getURL(key);
      if (!cachedData.isValidating) {
        try {
          set(key, { ...value, isValidating: true });
          const result = await fetchProvider(url);
          set(key, {
            ...value,
            data: result,
            error: null,
            isValidating: false,
          });
        } catch (err) {
          set(key, { ...cachedData, error: err, isValidating: false });
        }
      }
    }
  });
};
