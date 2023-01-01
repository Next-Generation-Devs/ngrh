import { useCallback, useEffect, useRef, useState } from "react";
import { getDefaultOptions } from "./helpers/config";
import { contains, filterSearch, findPath } from "./helpers/utils";

import type { UseSearch } from "types/useSearchTypes";

type extractGeneric<Type> = Type extends UseSearch<infer X> ? X : never;

type extracted = extractGeneric<UseSearch>;

export const useSearch: UseSearch = (source, opt = {}) => {
  const defaultOptions = getDefaultOptions();
  const options = Object.assign({}, defaultOptions, opt);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<extracted>(null);
  const ref = useRef<HTMLInputElement>();

  const onInputListener = useCallback(
    function (this: HTMLInputElement) {
      const newQuery = this.value;
      setQuery(newQuery);
      switch (options.searchType) {
        case "filter":
          {
            setResult(
              filterSearch<extracted>(source, newQuery, options.strictFilter)
            );
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
