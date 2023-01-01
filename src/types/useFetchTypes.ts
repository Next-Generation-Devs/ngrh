export type GlobalStateMap = Map<"cache", Cache>;

export type GetDefaultConfig = () => {
  fetchProvider: <T = any>(
    /**the key used in the hook (should be valid endpoint). */ url: string
  ) => Promise<T>;
  revalidateOnFocus: true;
};

export interface CacheRecordConfig<T = any> {
  /** a function that takes the key as a parameter and can return the data itself or a Promise the resolve the data (_defaults to a built-in provider uses [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)_). */ fetchProvider: <
    K = T
  >(
    /** the key used in the hook. */ url: string
  ) => Promise<K> | K;
  /** a boolean to indicate if the data of this key will revalidate on window focus (_defaults to `true`_). */ revalidateOnFocus: boolean;
}

export interface CacheRecord<T = any, E = any> {
  /** the cached data. */ data: T;
  /** function get called on the data in the cache has changed. */ onMutate: VoidFunction;
  /** the final options of the useFetch. */ config: CacheRecordConfig<T>;
  /** the error thrown by fetchProvider if exists. */ error: E;
  /** a boolean that checks if the data in the cache is validating. */ isValidating: boolean;
}

export type Cache = Map<string, CacheRecord>;

export type GetCache = <T = any, E = any>(
  /** the cache key */ key: string
) => CacheRecord<T, E>;

export type SetCache = (
  /** the cache key */ key: string,
  /** the value to set. */ value: CacheRecord
) => void;

export type InitFocus = (callback: (e: FocusEvent) => void) => VoidFunction;

export type InitCache = () => [GetCache, SetCache, VoidFunction];

export type GetMutateDefaultOptions = () => {
  revalidate: true;
  tempData: undefined;
  rollbackOnError: true;
};

export interface MutateOptions<T = any> {
  /** a boolean to tell the function to revalidate the data from the server (or the cache) after mutate them (_defaults to `true`_). */ revalidate?: boolean;
  /** a temporary data to keep the state truthy and get rid of the loading states (_defaults to `null`_). */ tempData?: T;
  /** to get the cached data if the mutate or the revalidate is rejected (_Note that you'll not roll back to cached data on error if you provide a tempData and the cache system will use the tempData instead and defaults to `true`_). */ rollbackOnError?: boolean;
}

export interface MutateParams<T = any> {
  /** the key of the data want to mutate. */ key: string;
  /** the data you want to replace your current data with (could be a promise or normal). */ dataPromise:
    | Promise<T>
    | T;
  /** the options of the mutate function. */ options: MutateOptions<T>;
}

export type Mutate = <T = any>(
  /** the key of the data want to mutate. */ key: MutateParams<T>["key"],
  /** the data you want to replace your current data with (could be a promise or normal). */ dataPromise?: MutateParams<T>["dataPromise"],
  /** the options of the mutate function. */ options?: MutateParams<T>["options"]
) => Promise<void>;

export type RevalidateAllKeys = VoidFunction;

export type KeyMutate = <T = any>(
  /** the data you want to replace your current data with (could be a promise or normal). */ data:
    | Promise<T>
    | T,
  /** options: the options of the mutate function. */ options: MutateOptions<T>
) => void | Promise<void>;

export interface UseFetchReturnObject<T = any, E = any> {
  /** the data resolved by the fetchProvider. */ data: T | null;
  /** the error thrown by fetchProvider if exists. */ error: E | null;
  /** a state to get the loading state of the data. */ loading: boolean;
  /** a function to mutate the data either on the server or just locally. */ mutate: KeyMutate;
}

export interface FetchOptions {
  /** a function that takes the key as a parameter and can return the data itself or a Promise the resolve the data (_defaults to a built-in provider uses [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)_). */ fetchProvider?: <
    T = any
  >(
    /**the key used in the hook (should be valid endpoint). */ url: string
  ) => Promise<T> | T;
  /** a boolean to indicate if the data of this key will revalidate on window focus (_defaults to `true`_). */ revalidateOnFocus?: boolean;
}

export type UseFetch = <T = any, E = any>(
  /** any string if you'll use your own `fetchProvider` or a valid api endpoint if you will to use the default provider of the hook. */ key: string,
  /** the options of the useFetch hook. */ options?: FetchOptions
) => UseFetchReturnObject<T, E>;
