import { useCallback, useEffect } from "react";

import type { UseClickOutside } from "types/useClickOutsideTypes";

export const useClickOutside: UseClickOutside = (
  ref,
  { onClickOutside, onTouchOutside }
) => {
  const handleClick = useCallback((e: MouseEvent) => {
    if (!ref.current.contains(e.target as Node)) {
      onClickOutside(e);
    }
  }, []);

  const handleTouch = useCallback((e: TouchEvent) => {
    if (!ref.current.contains(e.target as Node)) {
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
