# The use-store hook 🚀

This hook is created basically to the developers who don't like to use wrappers around there components just for some dummy states that is need to be shared across the app.

So what's the solution 🤔?

Basically call useStore any place in the app and assign some state to it and thats it, your state is available all across the app.

Is it that simple 😮?

Fortunatley yes it is. we use a caching system to keep the state up to date and shared between all the pages and components across the app with zero wrappers (Notice that the state will fade away when the javascript is reloded which is the default behavior in redux and the vanilla context api).

## Usage ⚒️

The use-store hook is pretty simple to use. you just pass it the key and the initial state for the first state initialization and thats it! now your state is shared all among the app.

The hook parameters 💡:

- key 🗝️: a unique key to mark your state and be able to call it from the global store.
- initialState 🎚️: the initial state for your stored data (use it when you initilaize your state for the first time).

The hook returns 👉:

- state 🎚️: the current state.
- setState 🔗: a function to change the current state.

We created also a hook called useGlobalStore that returns the store which include all the states in the app and a function to update any of those states.

The use-global-hook don't need any params and will return 👉:

- store 🏪: an object that holds all the stored data in the application.
- updateStoreData 🔗: a function to update a specific state someplace in the app.

## Examples 💥

Using the hook and storing data 🧺:

```js
/* Main page */

import useStore from "ngrh/use-store";

const MainPage = () => {
  const { state } = useStore("SOME_KEY", { test: "data" });
  // ...
};

/* Other page */

import useStore from "ngrh/use-store";

const OtherPage = () => {
  const { state, setState } = useStore("SOME_KEY"); // the state will be avilable here to use and to update.
  // ...
};
```

Using the global store 🌍:

```js
/* Main page */

import useStore from "ngrh/use-store";

const MainPage = () => {
  const { state } = useStore("SOME_KEY", { test: "data" });
  // ...
};

/* Other page */

import { useGlobalStore } from "ngrh/use-store";

const OtherPage = () => {
  const { store, updateStoreData } = useGlobalStore();
  const stateInMainPage = store["SOME_KEY"]; // we can also updated from here and it will be updated in the Main Page
  // ...
};
```

## License ✅

MIT
