import { useCallback, useEffect, useState } from "react";
import { doCompare } from "./helpers/utils";
import { getDefaultOptions } from "./helpers/config";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useMediaQuery}
 */

export const useMediaQuery = (opt = {}) => {
  const defaultOptions = getDefaultOptions();
  const options = Object.assign({}, defaultOptions, opt);
  const [isWidth, setIsWidth] = useState(
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
