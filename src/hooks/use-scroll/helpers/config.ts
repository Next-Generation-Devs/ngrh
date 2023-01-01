import type { GetDefaultOptions } from "types/useScrollTypes";

export const getDefaultOptions: GetDefaultOptions = () => {
  return { customRef: null, scrollTypes: { y: true, x: false } };
};
