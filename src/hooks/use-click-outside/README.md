# The use-click-outside hook 🚀

Helper hook to handle click outside events.

## Usage ⚒️

The hook take two params ✨:

- `ref` 🪝: the ref of the element to check if clicked outside of it.
- `options` ⚙️: options contains two functions to call on click outside:
- - `onClickOutside`: a function to call on click outside.
- - `onTouchOutside`: a function to call on touch outside. You can ignore it if you want the same function to run on both events.

The hook don't return anything.

## Examples 💥

Using the hook to change open state to closed 🚪:

```js
import useClickOutside from "ngrh/use-click-outside";
import * as React from "react";

const Page = () => {
  const ref = React.useRef();
  const [state, setState] = React.useState("open");

  useClickOutside(ref, {
    onClickOutside: () => {
      setState("closed");
    },
  });

  return (
    <div>
      <div>{state}</div>
      <div ref={ref}>in</div>
      <div>out</div>
    </div>
  );
};
```

## License ✅

MIT
