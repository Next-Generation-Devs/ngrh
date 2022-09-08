# The use-intersection-observer hook 🚀

a hook to help implementing `IntersectionObserver` inside react.

## Usage ⚒️

The hook takes `options ⚙️` as parameter.

The option can contain the following props 💫:

- `callback` 🎆: a callback function hooked to the `observer.observe` (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)).
- `observerOptions` ✨: the observer options (see more [here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)).

The hook returns one value:

- `observer` 👀: a ref for the observer for custom usage.

## Examples 💥

Using the hook to observe elements and delete them on intersecting 🗑️:

```js
import useInterSectionObserver from "ngrh/use-intersection-observer";
import React from "react";

const Page = () => {
  useInterSectionObserver(".read-the-docs", {
    callback: (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.remove();
        }
      });
    },
    observerOptions: { rootMargin: "100px" },
  });

  return (
    <div>
      <p>Scroll down to start delete</p>
      <div style={{ height: "100vh" }}></div>
      <p className="read-the-docs1">delete me</p>
      <div style={{ height: "100vh" }}></div>
      <p className="read-the-docs1">delete me</p>
    </div>
  );
};
```

The hook can take a ref or **refs array** also as selector 🪞:

```js
import useInterSectionObserver from "ngrh/use-intersection-observer";
import * as React from "react";

const Page = () => {
  const ref1 = React.useRef();
  const ref2 = React.useRef();
  useInterSectionObserver([ref1, ref2], {
    callback: (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.remove();
        }
      });
    },
    observerOptions: { rootMargin: "100px" },
  });

  return (
    <div>
      <p>Scroll down to start delete</p>
      <div style={{ height: "100vh" }}></div>
      <p ref={ref1} className="read-the-docs1">
        delete me
      </p>
      <div style={{ height: "100vh" }}></div>
      <p ref={ref2} className="read-the-docs1">
        delete me
      </p>
    </div>
  );
};
```

## License ✅

MIT
