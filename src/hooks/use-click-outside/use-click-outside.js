import { useCallback, useEffect } from "react";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useClickOutside}
 */

export const useClickOutside = (ref, { onClickOutside, onTouchOutside }) => {
  const handleClick = useCallback((e) => {
    if (!ref.current.contains(e.target)) {
      onClickOutside(e);
    }
  }, []);

  const handleTouch = useCallback((e) => {
    if (!ref.current.contains(e.target)) {
      if (typeof onTouchOutside === "function") {
        onTouchOutside(e);
      } else {
        onClickOutside(e);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleTouch);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleTouch);
    };
  }, []);
};
