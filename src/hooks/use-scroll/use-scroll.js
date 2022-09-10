import { useCallback, useEffect, useState } from "react";
import { getDefaultOptions } from "./helpers/config";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useScroll}
 */

export function useScroll(opt = {}) {
  const defaultOptions = getDefaultOptions();
  const options = Object.assign({}, defaultOptions, opt);
  const { customRef, scrollTypes } = options;
  const [sx, setSx] = useState(0);
  const [sy, setSy] = useState(0);

  const handleScroll = useCallback(() => {
    if (customRef) {
      if (scrollTypes.x) setSx(customRef.current.scrollLeft);
      if (scrollTypes.y) setSy(customRef.current.scrollTop);
    } else {
      if (scrollTypes.x) setSx(scrollX);
      if (scrollTypes.y) setSy(scrollY);
    }
  }, [scrollTypes]);

  useEffect(() => {
    if (customRef) {
      customRef.current.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (customRef) {
        customRef.current.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return { scroll_x: sx, scroll_y: sy };
}
