import { useCallback, useEffect, useRef, useState } from "react";
import { getDefaultOptions } from "./helpers/config";
import { contains, filterSearch, findPath } from "./helpers/utils";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useSearch}
 */

export const useSearch = (source, opt = {}) => {
  const defaultOptions = getDefaultOptions();
  const options = Object.assign({}, defaultOptions, opt);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const ref = useRef();

  const onInputListener = useCallback(
    (e) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      switch (options.searchType) {
        case "filter":
          {
            setResult(filterSearch(source, newQuery, options.strictFilter));
          }
          break;
        case "check":
          {
            setResult(contains(source, newQuery));
          }
          break;
        case "path":
          {
            setResult(findPath(source, newQuery, options.parsePaths));
          }
          break;
      }
    },
    [options]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("input", onInputListener);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("input", onInputListener);
      }
    };
  }, []);

  return { ref, query, result };
};
