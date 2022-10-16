import { MutableRefObject } from "react";

export interface Options {
  onClickOutside: (e: MouseEvent | TouchEvent) => void;
  onTouchOutside: (e: TouchEvent) => void;
}

export type UseClickOutside = (
  ref: MutableRefObject<HTMLElement>,
  options: Options
) => void;
