import { initCache } from "./cache";
import { GlobalState } from "./global-state";
import * as types from "./types"; // eslint-disable-line no-unused-vars

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
      let result = dataPromise;
      if (result instanceof Promise) {
        result = await result;
      }
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
    try {
      let result = fetchProvider(key);
      if (result instanceof Promise) {
        result = await result;
      }
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
      if (!cachedData.isValidating) {
        try {
          set(key, { ...value, isValidating: true });
          let result = fetchProvider(key);
          if (result instanceof Promise) {
            result = await result;
          }
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
