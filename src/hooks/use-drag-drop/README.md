# The use-drag-drop hook 🚀

This hook will help you to create a drag & drop area and style it as you wish.

## Usage ⚒️

This hook run fully by vanilla [javascript drag & drop api](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) and there is no need to add any extra packages to it.

The hook take options object as params which have the following props ✨:

- `selector` 📖: the selector of the zone that will be the drag & drop area. Could be an id or ref or array of ids and refs.
- `onDragLeave` ⬅️: a function runs when the item dragged out an area.
- `onDragEnter` ➡️: function runs when the item dragged in an area.
- `onDragOver` ⭕: function runs when the item is over an area.
- `onDrop` ☔: function runs when the item dropped on an area.

This hook don't return any thing.

## Examples 💥

Using the hook to handle dropping file on some divs 💧:

```js
import useDragDrop from "ngrh/use-drag-drop";
import React, { useRef } from "react";

const Page = () => {
  const ref1 = useRef();

  const onDrop = (/**@type {DragEvent} */ e) => {
    e.target.innerHTML = "SOME_HTML";
    const eventListener = (eve) => {
      eve.target.innerHTML = "";
    };
    e.target.addEventListener("click", eventListener);
  };

  useDragDrop({ selector: ["id1", ref1], onDrop });

  return (
    <div className="App">
      >
      <div
        id="id1"
        style={{
          width: "60vw",
          height: "80vh",
          // ...
        }}
      >
        drag & drop #1
      </div>
      <div
        ref={ref2}
        style={{
          width: "60vw",
          height: "80vh",
          // ...
        }}
      >
        drag & drop #2
      </div>
    </div>
  );
};
```

## License ✅

MIT
