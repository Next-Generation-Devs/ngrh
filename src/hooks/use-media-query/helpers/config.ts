import type { GetDefaultOptions } from "types/useMediaQueryTypes";

export const getDefaultOptions: GetDefaultOptions = () => {
  return { minWidth: 0, maxWidth: Infinity };
};
