import { useEffect, useRef } from "react";
import { getDefaultOptions } from "./helpers/config";

import type { UseIntersectionObserver } from "types/useIntersectionObserverTypes";

export const useIntersectionObserver: UseIntersectionObserver = (
  selector,
  opt = {}
) => {
  const defaultOptions = getDefaultOptions();
  const options = Object.assign({}, defaultOptions, opt);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const Observer = new IntersectionObserver(
      options.callback,
      options.observerOptions
    );
    if (Array.isArray(selector)) {
      selector.forEach(({ current }) => {
        Observer.observe(current);
      });
    } else if (typeof selector === "string") {
      const collection = document.querySelectorAll(selector);
      collection.forEach((element) => {
        Observer.observe(element);
      });
    } else if (selector?.current) {
      Observer.observe(selector.current);
    }
    observer.current = Observer;
    return () => {
      if (Array.isArray(selector)) {
        selector.forEach(({ current }) => {
          Observer.unobserve(current);
        });
      } else if (typeof selector === "string") {
        const collection = document.querySelectorAll(selector);
        collection.forEach((element) => {
          Observer.unobserve(element);
        });
      } else if (selector?.current) {
        Observer.unobserve(selector.current);
      }
    };
  }, []);

  return { observer };
};
