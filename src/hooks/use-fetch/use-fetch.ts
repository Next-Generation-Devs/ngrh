import { useRef, useEffect, useState, useCallback } from "react";
import { UseFetch, UseFetchReturnObject } from "types/useFetchTypes";
import { initCache } from "./helpers/cache";
import { getDefaultConfig } from "./helpers/config";
import { mutate as internalMutate } from "./helpers/mutate";

export const useFetch: UseFetch = (key, options = {}) => {
  const [data, setData] = useState<UseFetchReturnObject["data"]>(null);
  const [error, setError] = useState<UseFetchReturnObject["error"]>(null);
  const [loading, setLoading] = useState<UseFetchReturnObject["loading"]>(true);
  const isMounted = useRef<boolean>(true);
  const [getCache, setCache, unmount] = initCache();

  const defaultConfig = getDefaultConfig();
  const config = Object.assign({}, defaultConfig, options);
  const { fetchProvider } = config;

  const onMutate = useCallback(() => {
    const cachedValue = getCache(key);
    setError(cachedValue.error);
    setData(cachedValue.data);
  }, [key]);

  const mutate: UseFetchReturnObject["mutate"] = useCallback(
    async (data, options) => {
      await internalMutate(key, data, options);
    },
    [key]
  );

  useEffect(() => {
    if (isMounted) {
      const cachedValue = getCache(key);
      if (cachedValue) {
        setLoading(false);
        if (cachedValue.error) {
          setError(cachedValue.error);
        } else {
          setData(cachedValue.data);
        }
      } else {
        const getResult = async () => {
          try {
            let result = fetchProvider(key);
            if (result instanceof Promise) {
              result = await result;
            }
            setLoading(false);
            setCache(key, {
              data: result,
              error: null,
              onMutate,
              config,
              isValidating: false,
            });
          } catch (err) {
            setLoading(false);
            setCache(key, {
              error: err,
              data: null,
              onMutate,
              config,
              isValidating: false,
            });
          }
        };
        getResult();
      }
    }
  }, [key]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      unmount();
    };
  }, []);

  return {
    data,
    error,
    loading,
    mutate,
  };
};
