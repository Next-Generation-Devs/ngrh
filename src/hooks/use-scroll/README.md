# The use-scroll hook 🚀

Helper hook to handle scroll event.

## Usage ⚒️

The hook take one parameter ✨:

- `options` ⚙️: options contains two props to customize results:
- - `scrollTypes`: the type of the scroll you want to listen to. have two values:
- - - `x`: enable getting scroll horizontal value (_defaults to `false`_).
- - - `y`: enable getting scroll vertical value (_defaults to `true`_).
- - `customRef`: if you want to get specific element's scroll set this prop to that element's ref (_defaults to `null`_).

The hook returns object with two prop 💫:

- `scroll_x` 🟡: the horizontal scroll value of the window or the customref.
- `scroll_y` 🟠: the vertical scroll value of the window or the customref.

## Examples 💥

Using the hook to get the scroll x of the window 🪟:

```js
import useScroll from "ngrh/use-click-outside";

const Page = () => {
  const { scroll_x } = useScroll({
    scrollTypes: { x: true, y: false },
  });

  // Some UI...
};
```

Using the hook to get the scroll y of custom list 📃:

```js
import useScroll from "ngrh/use-click-outside";
import * as React from "react";

const Page = () => {
  const ref = React.useRef();
  const { scroll_y } = useScroll({
    customRef: ref,
  });

  <div>
    <ul ref={ref}>{/* some long list */}</ul>
  </div>;
};
```

## License ✅

MIT
