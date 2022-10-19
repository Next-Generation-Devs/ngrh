import { initCache } from "./cache";
import { GlobalState } from "./global-state";

import type {
  Cache,
  GetMutateDefaultOptions,
  MutateOptions,
  MutateParams,
  RevalidateAllKeys,
} from "types/useFetchTypes";

const getMutateDefaultOptions: GetMutateDefaultOptions = () => {
  return { revalidate: true, tempData: undefined, rollbackOnError: true };
};

export const mutate = async <T = any, E = any>(
  key: MutateParams<T>["key"],
  dataPromise?: MutateParams<T>["dataPromise"],
  opt: MutateParams<T>["options"] = {}
): Promise<void> => {
  const defaultOptions = getMutateDefaultOptions();
  const options = Object.assign({}, defaultOptions, opt);
  const [get, set] = initCache();
  const cachedData = get<T, E>(key);
  const {
    config: { fetchProvider },
  } = cachedData;
  if (options.tempData) {
    set(key, { ...cachedData, data: options.tempData, error: null });
  }
  if (dataPromise) {
    try {
      const result = await dataPromise;
      if (!options.tempData) {
        set(key, {
          ...cachedData,
          data: result,
          error: null,
        });
      }
    } catch (err) {
      if (!options.tempData) {
        set(key, {
          ...cachedData,
          data: options.rollbackOnError ? cachedData.data : null,
          error: err,
        });
      }
    }
  }
  if (options.revalidate) {
    try {
      let result = fetchProvider<T>(key);
      if (result instanceof Promise) {
        result = await result;
      }
      set(key, { ...cachedData, data: result, error: null });
    } catch (err: any) {
      set(key, {
        ...cachedData,
        data: options.rollbackOnError ? cachedData.data : null,
        error: err,
      });
    }
  }
};

export const revalidateAllKeys: RevalidateAllKeys = () => {
  const [get, set] = initCache();
  const cache = GlobalState.get("cache") as Cache;
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
