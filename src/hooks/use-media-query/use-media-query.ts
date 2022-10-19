import { useCallback, useEffect, useState } from "react";
import { doCompare } from "./helpers/utils";
import { getDefaultOptions } from "./helpers/config";

import type { UseMediaQuery } from "types/useMediaQueryTypes";

export const useMediaQuery: UseMediaQuery = (opt = {}) => {
  const defaultOptions = getDefaultOptions();
  const options = Object.assign({}, defaultOptions, opt);
  const [isWidth, setIsWidth] = useState<ReturnType<UseMediaQuery>>(
    typeof window !== "undefined" ? doCompare(window, options) : false
  );

  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsWidth(doCompare(window, options));
    }
  }, []);

  useEffect(() => {
    setIsWidth(doCompare(window, options));
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isWidth;
};
