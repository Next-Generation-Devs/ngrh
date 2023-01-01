export type Parse = (cookie: string) => Object;

export interface SetCookieOptions {
  /**
   * the age of the cookie in the browser in seconds. if null then the cookie will expire after closing the session of the browser.
   */
  maxAge?: number;
  /**
   * the path the cookie available at (_defaults to `"/"`_).
   */
  path?: string;
  /**
   * the domain the cookie available at (_defaults to the same domain of the document_).
   */
  domain?: string;
  /**
   * the date that the cookie will expire (don't use it with `maxAge`).
   */
  expires?: Date;
  /**
   * determine that cookie only be transmitted over secure protocol as https ([see more](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)).
   */
  secure?: boolean;
  /**
   * when the client browser limit has been reached, this attribute determins which cookies should stay over others.
   */
  priority?: "low" | "medium" | "high";
  /**
   * prevents the browser from sending this cookie along with cross-site requests ([see more](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)).
   */
  sameSite?: "strict" | "lax" | "none";
}

export type Serialize = (
  cookieName: string,
  cookieValue: string,
  options?: SetCookieOptions
) => string;

export interface UseCookiesReturnObject {
  /**
   * returns all the cookie in the browser.
   */
  getCookies: () => Object;
  /**
   * set a cookie in the browser (don't use client side).
   */
  setCookie: (
    /** the name of the cookie. */ name: string,
    /** the value of the cookie. */ value: string,
    /** the options of setting the cookie. */ options?: SetCookieOptions
  ) => void;
  /**
   * remove cookie from the browser.
   */
  removeCookie: (/** the name of the cookie. */ name: string) => void;
}

export type UseCookies = () => UseCookiesReturnObject | undefined;
