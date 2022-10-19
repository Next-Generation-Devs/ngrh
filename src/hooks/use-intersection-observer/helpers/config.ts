import { GetDefaultOptions } from "types/useIntersectionObserverTypes";

export const getDefaultOptions: GetDefaultOptions = () => {
  return { callback: () => {}, observerOptions: {} };
};
