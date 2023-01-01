export type DoCompare = (
  window: Window,
  options: MediaQueryOptions & MediaQueryDefaultOptions
) => boolean;

export interface MediaQueryDefaultOptions {
  minWidth: number;
  maxWidth: number;
}

export type GetDefaultOptions = () => MediaQueryDefaultOptions;

export interface MediaQueryOptions {
  minWidth?: number;
  maxWidth?: number;
}

export type UseMediaQuery = (opt?: MediaQueryOptions) => boolean;
