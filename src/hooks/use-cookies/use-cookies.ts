import { useCallback } from "react";
import { parse, serialize } from "./helpers/utils";

import type { UseCookies, UseCookiesReturnObject } from "types/useCookiesTypes";

export const useCookies: UseCookies = () => {
  const SSR = typeof document === "undefined";

  if (SSR) {
    return;
  }

  const getCookies: UseCookiesReturnObject["getCookies"] = useCallback(() => {
    return parse(document.cookie);
  }, []);

  const setCookie: UseCookiesReturnObject["setCookie"] = useCallback(
    (name, value, options) => {
      document.cookie = serialize(name, value, options);
    },
    []
  );

  const removeCookie: UseCookiesReturnObject["removeCookie"] = useCallback(
    (name) => {
      setCookie(name, "", { maxAge: -1 });
    },
    []
  );

  return { getCookies, setCookie, removeCookie };
};
