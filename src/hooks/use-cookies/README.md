# The use-cookies hook 🚀

This hook will help you to manage your browser cookies.

## Usage ⚒️

This hook run fully by vanilla [Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) and there is no need to add any extra packages to it.

The hook take no params to run.

The hook return an object that contains 3 values:

- `getCookies` 🍪: returns all the cookie in the browser.
- `setCookie` 🍳: set a cookie in the browser (don't use client side). takes three parameters:
- - `name`: the name of the cookie.
- - `value`: the value of the cookie.
- - `options`: the options of setting the cookie. contains:
- - - `maxAge`: the age of the cookie in the browser in seconds. if null then the cookie will expire after closing the session of the browser.
- - - `path`: the path the cookie available at (_defaults to `"/"`_).
- - - `domain`: the domain the cookie available at (_defaults to the same domain of the document_).
- - - `expires`: the date that the cookie will expire (don't use it with `maxAge`).
- - - `secure`: determine that cookie only be transmitted over secure protocol as https ([see more](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)).
- - - `priority`: when the client browser limit has been reached, this attribute determins which cookies should stay over others.
- - - `sameSite`: prevents the browser from sending this cookie along with cross-site requests ([see more](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)).
- `removeCookie` 🗑️: remove cookie from the browser. takes one parameter:
- - `name`: the name of the cookie.

## Examples 💥

Using the hook to set a cookie 🥯:

```js
import useCookies from "ngrh/use-cookies";

const Page = () => {
  const { setCookie } = useCookies();

  return (
    <>
      <button
        onClick={() => setCookie("some_name", "some_value", { maxAge: 3600 })}
      >
        set cookie for hour
      </button>
    </>
  );
};
```

Using the hook to get all the cookies in browser 🍪:

```js
import useCookies from "ngrh/use-cookies";

const Page = () => {
  const { getCookies } = useCookies();

  return (
    <>
      <button onClick={() => alert(JSON.stringify(getCookies()))}>
        show all the cookies
      </button>
    </>
  );
};
```

## License ✅

MIT
