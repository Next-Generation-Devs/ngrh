import { useCallback } from "react";
import { parse, serialize } from "./helpers/utils";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useCookies}
 */

export const useCookies = () => {
  const SSR = typeof document === "undefined";

  if (SSR) {
    return {
      getCookies: () => {},
      setCookie: () => {},
      removeCookie: () => {},
    };
  }

  const getCookies = useCallback(() => {
    return parse(document.cookie);
  }, []);

  const setCookie = useCallback((name, value, options) => {
    document.cookie = serialize(name, value, options);
  }, []);

  const removeCookie = useCallback((name) => {
    setCookie(name, "", { maxAge: -1 });
  }, []);

  return { getCookies, setCookie, removeCookie };
};
