import { MutableRefObject } from "react";

export interface IntersectionOvserverDefaultOptions {
  callback: VoidFunction;
  observerOptions: {};
}

export type GetDefaultOptions = () => IntersectionOvserverDefaultOptions;

export interface UseIntersectionObserverReturnObject {
  /** a ref for the observer for custom usage. */ observer: MutableRefObject<IntersectionObserver | null>;
}

export interface IntersectionObserverOptions {
  /** a callback function hooked to the `observer.observe` (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)). */ callback?: IntersectionObserverCallback;
  /** the observer options (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)). */ observerOptions?: IntersectionObserverInit;
}

export type UseIntersectionObserver = (
  /** the selector of the elements to observe. Can be a ref, array of refs or a css selector. */ selector:
    | string
    | MutableRefObject<HTMLElement>,
  /** the options of the hook. */ opt?: IntersectionObserverOptions
) => UseIntersectionObserverReturnObject;
