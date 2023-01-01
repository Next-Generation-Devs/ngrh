import type { Parse, Serialize } from "types/useCookiesTypes";

export const parse: Parse = (cookie) => {
  const arr = cookie.split("; ").map((el) => el.split("="));
  if (arr?.[0]?.[0] === "") return {};
  return Object.fromEntries(arr);
};

const priorityArray = ["low", "medium", "high"];

const sameSiteArray = ["strict", "lax", "none"];

const capitalize = (str: string): string =>
  str[0].toUpperCase() + str.substring(1);

export const serialize: Serialize = (cookieName, cookieValue, options = {}) => {
  let str = `${cookieName}=${cookieValue}`;
  if (options.maxAge && !isNaN(options.maxAge)) {
    str += `; Max-Age=${Math.floor(options.maxAge)}`;
  }
  if (options.path && typeof options.path === "string") {
    str += `; Path=${options.path}`;
  }
  if (options.domain && typeof options.domain === "string") {
    str += `; Domain=${options.domain}`;
  }
  if (options.expires && options.expires instanceof Date) {
    str += `; Expires=${options.expires.toUTCString()}`;
  }
  if (options.secure) {
    str += "; Secure";
  }
  if (options.priority && priorityArray.includes(options.priority)) {
    str += `; Priority=${capitalize(options.priority)}`;
  }
  if (options.sameSite && sameSiteArray.includes(options.sameSite)) {
    str += `; SameSite=${capitalize(options.sameSite)}`;
  }
  return str;
};
