# The use-media-query hook π

a hook to help sensoring the screen's width if it's matching the opitons or not.

## Usage βοΈ

The hook takes `options βοΈ` as parameter.

The option can contain the following props π«:

- `minWidth` 0οΈβ£: the minimum width in pixels of the scren you want the value to be true on (_defaults to `0`_).
- `maxWidth` βΎοΈ: the maximum width in pixels of the scren you want the value to be true on (_defaults to [Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)_).

The hook returns one value:

- `result` π₯: a boolean determines if the window matches the options.

**Note**: The hook also works on the server and there is no need to check if the window is defined or not.

## Examples π₯

Using the hook to check the window minWidth πͺ:

```js
import useMediaQuery from "ngrh/use-media-query";

const Page = () => {
  const isPCScreen = useMediaQuery({ minWidth: 992 });

  // ...
};
```

## License β

MIT
