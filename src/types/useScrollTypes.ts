import { MutableRefObject } from "react";

export interface DefaultOptions {
  customRef: null;
  scrollTypes: { y: boolean; x: boolean };
}

export type GetDefaultOptions = () => DefaultOptions;

export interface FinalOptions {
  /** if you want to get specific element's scroll set this prop to that element's ref (_defaults to `null`_). */ customRef: MutableRefObject<HTMLElement>;
  /** object contains booleans determins which values you'll get. */ scrollTypes: {
    /** enable getting scroll horizontal value (_defaults to `false`_). */ y: boolean;
    /** enable getting scroll vertical value (_defaults to `true`_). */ x: boolean;
  };
}

export interface UseScrollReturnObject {
  /** the horizontal scroll value of the window or the customref. */ scroll_x: number;
  /** the vertical scroll value of the window or the customref. */ scroll_y: number;
}

export type UseScroll = (
  /** set custom options. */ opt?: Partial<FinalOptions>
) => UseScrollReturnObject;
