import { getSet } from "./charsets";

import type { GetDefaultOptions } from "types/useRandomTypes";

export const getDefaultOptions: GetDefaultOptions = () => {
  return {
    type: "individual",
    length: 32,
    charset: getSet("alphanumeric"),
    amount: 5,
  };
};
