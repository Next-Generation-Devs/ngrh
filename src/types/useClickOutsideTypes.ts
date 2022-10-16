import { MutableRefObject } from "react";

export interface Options {
  /**
   * a function to call on click outside.
   */
  onClickOutside: (
    /** the native mouse click event (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent). */ e:
      | MouseEvent
      | TouchEvent
  ) => void;
  /**
   * a function to call on touch outside. You can ignore it if you want the same function to run on both events.
   */
  onTouchOutside: (
    /** the native touch start event (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event)). */ e: TouchEvent
  ) => void;
}

export type UseClickOutside = (
  /** the ref of the element to check if clicked outside of it. */ ref: MutableRefObject<HTMLElement>,
  /** options contains two functions to call on click outside. */ options: Options
) => void;
