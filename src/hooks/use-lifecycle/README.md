# The use-lifecycle hook 🚀

a hook to help simplifying components life-cycle methods.

## Usage ⚒️

The hook takes two parameters ✨:

- `functions` 🏁:
- - `didMount`: a function that runs on initial component mounting.
- - `didUpdate`: a function that runs on each component update.
- - `willUnmount`: a function that runs when the component is unmounting.
- `conditions` 📃: the conditions for that the didUpdate function will run onChange.

The hook returns nothing.

## Examples 💥

Using the hook to run some tasks in the lifecycle of the component 🎗️:

Note that if no conditions provided the didUpdate function will not be triggred until unmounting the comp.

```js
import useLifecycle from "ngrh/use-lifecycle";

const Page = () => {
  const [state, setState] = useState();
  useLifecycle(
    {
      didMount: () => {
        /* do something */
      },
      didUpdate: () => {
        /* do something when "state" changes and when unmounting */
      },
      willUnmount: () => {
        /* do something */
      },
    },
    [state]
  );

  // ...
};
```

## License ✅

MIT
