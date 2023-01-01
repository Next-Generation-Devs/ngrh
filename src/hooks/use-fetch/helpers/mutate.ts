import { initCache } from "./cache";
import { GlobalState } from "./global-state";

import type {
  Cache,
  GetMutateDefaultOptions,
  MutateParams,
  RevalidateAllKeys,
} from "types/useFetchTypes";

const getMutateDefaultOptions: GetMutateDefaultOptions = () => {
  return { revalidate: true, tempData: undefined, rollbackOnError: true };
};

export const mutate = <T = any, E = any>(
  key: MutateParams<T>["key"],
  dataPromise?: MutateParams<T>["dataPromise"],
  opt: MutateParams<T>["options"] = {}
): void | Promise<any> => {
  const promises: Promise<any>[] = [];

  const defaultOptions = getMutateDefaultOptions();
  const options = {
    ...defaultOptions,
    ...opt,
  };
  const [get, set] = initCache();
  const cachedData = get<T, E>(key);
  const {
    config: { fetchProvider },
  } = cachedData;

  if (options.tempData) {
    set(key, { ...cachedData, data: options.tempData, error: null });
  }

  if (dataPromise) {
    if (dataPromise instanceof Promise) {
      promises.push(dataPromise);
      dataPromise
        .then((result) => {
          if (!options.tempData) {
            set(key, {
              ...cachedData,
              data: result,
              error: null,
            });
          }
        })
        .catch((err) => {
          if (!options.tempData) {
            set(key, {
              ...cachedData,
              data: options.rollbackOnError ? cachedData.data : null,
              error: err,
            });
          }
        });
    } else {
      set(key, {
        ...cachedData,
        data: dataPromise,
        error: null,
      });
    }
  }

  if (options.revalidate) {
    const result = fetchProvider<T>(key);
    if (result instanceof Promise) {
      promises.push(result);
      result
        .then((res) => {
          set(key, { ...cachedData, data: res, error: null });
        })
        .catch((err) => {
          set(key, {
            ...cachedData,
            data: options.rollbackOnError ? cachedData.data : null,
            error: err,
          });
        });
    } else {
      set(key, { ...cachedData, data: result, error: null });
    }
  }
  if (promises.length > 0) {
    return Promise.all(promises.map(async (promise) => await promise));
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
