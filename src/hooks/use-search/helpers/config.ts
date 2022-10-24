import type { GetDefaultOptions } from "types/useSearchTypes";

export const getDefaultOptions: GetDefaultOptions = () => {
  return {
    parsePaths: false,
    strictFilter: false,
    searchType: "filter",
  };
};
