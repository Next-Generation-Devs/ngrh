import { useEffect, useState } from "react";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useScroll}
 */

export function useScroll(
  options = { customRef: null, scrollTypes: { y: true, x: false } }
) {
  const { customRef, scrollTypes } = options;
  const [sx, setSx] = useState(0);
  const [sy, setSy] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (customRef) {
        if (scrollTypes.x) setSx(customRef.current.scrollLeft);
        if (scrollTypes.y) setSy(customRef.current.scrollTop);
      } else {
        if (scrollTypes.x) setSx(scrollX);
        if (scrollTypes.y) setSy(scrollY);
      }
    };
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
