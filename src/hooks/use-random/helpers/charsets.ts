import type { GetSet } from "types/useRandomTypes";

const ALPHA_NUMERIC =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

const ALPHABETIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const NUMERIC = "0123456789";

const HEX = "abcdef";

const BINARY = "01";

const OCTAL = "01234567";

export const getSet: GetSet = (charset) => {
  if (charset === "alphanumeric") {
    return ALPHA_NUMERIC;
  } else if (charset === "numeric") {
    return NUMERIC;
  } else if (charset === "alphabetic") {
    return ALPHABETIC;
  } else if (charset === "hex") {
    return HEX;
  } else if (charset === "binary") {
    return BINARY;
  } else if (charset === "octal") {
    return OCTAL;
  } else {
    return charset;
  }
};
