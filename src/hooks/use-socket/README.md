# The use-socket hook π

This hook will enable you to use the sokcet.io-client "socket" object and providing you some helper variables to adjust your ui depending on the socket state.

## Usage βοΈ

To use the hook you need first to install `socket.io-client` package to your project.

You can use either npm β¬οΈ:

```bash
npm i socket.io-client
```

or with yarn β¬οΈ:

```bash
yarn add socket.io-client
```

After the installation is completed you can import the hook and start to use it!.

The hook takes 4 parameters π‘:

- `serverUrl` π: the url of the server where your server socket is working.
- `options` βοΈ: the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)).
- `onConnect` π€: a callback function that run on socket connection.
- `onDisconnect` π: a callback function that run on socket disconnection.

The hook return an object contains 3 props β¨:

- `socketRef` π : the ref to the socket object (see more details [here](https://socket.io/docs/v4/client-api/#socket)).
- `isConnecting` π: state indicates the connecting stage of the socket.
- `isDisconnected` πΈοΈ: state detects when the socket is disconnected.

This hook comes with a **context** component that you can use if you want to use the hooks props in nested components in the application. We recomend to use this compnent due to it's cleaner code and better implementation.

The SocketProvider Component take 4 properties π‘:

- `serverUrl` π: the url of the server where your server socket is working.
- `socketOptions` βοΈ: the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)).
- `onConnect` π€: a callback function that run on socket connection.
- `onDisconnect` π: a callback function that run on socket disconnection.

## Examples π₯

Using the useSocket hook directly βΆοΈ:

```js
import useSocket from "ngrh/use-socket";

const SomeComp = () => {
  const { socketRef, isConnecting, isDisconnected } = useSocket(
    "your-socket-server.com"
  );
  return <div>Some UI</div>;
};
```

And here is how to use the context component it πͺ‘:

```js
import { SocketProvider, Context as SocketContext } from "./use-socket";
import { useContext } from "react"

const ButtonComp = () => {
  const { socketRef } = useContext(SocketContext)
  return (
    <button onClick={/* Some Event Using The Socket */} >
      Click Me
    </button>
  )
}

const MainComp = () => {
  return (
    <SocketProvider serverURL="your-socket-server.com" >
      <Button>click</Button>
    </SocketProvider>
  )
}
```

## License β

MIT
