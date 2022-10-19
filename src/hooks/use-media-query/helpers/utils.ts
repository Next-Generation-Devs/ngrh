import type { DoCompare } from "types/useMediaQueryTypes";

export const doCompare: DoCompare = (window, options) => {
  return (
    window.innerWidth >= options.minWidth &&
    window.innerWidth < options.maxWidth
  );
};
