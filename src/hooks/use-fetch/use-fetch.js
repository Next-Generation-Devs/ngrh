import { useRef, useEffect, useState, useCallback } from "react";
import { initCache } from "./helpers/cache";
import { getDefaultConfig } from "./helpers/config";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars
import { mutate as internalMutate } from "./helpers/mutate";

/**
 * @type {types.useFetch}
 */

export const useFetch = (key, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const [getCache, setCache, unmount] = initCache();

  const defaultConfig = getDefaultConfig();
  const config = Object.assign({}, defaultConfig, options);
  const { fetchProvider } = config;

  const onMutate = useCallback(() => {
    const cachedValue = getCache(key);
    setError(cachedValue.error);
    setData(cachedValue.data);
  }, [key]);

  const mutate = useCallback(
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
