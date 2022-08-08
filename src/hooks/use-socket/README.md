# The use-socket hook

This hook will enable you to use the sokcet.io-client "socket" object and providing you some helper variables to adjust your ui depending on the socket state.

## Usage

To use the hook you need first to install `socket.io-client` package to your project.

You can use either npm:

```bash
npm i socket.io-client
```

or with yarn:

```bash
yarn add socket.io-client
```

After the installation is completed you can import the hook and start to use it!.

The hook takes 4 parameters:

- serverUrl: the url of the server where your server socket is working.
- options: the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)).
- onConnect: a callback function that run on socket connection.
- onDisconnect: a callback function that run on socket disconnection.

This hook comes with a **context** component that you can use if you want to use the hooks props in nested components in the application. We recomend to use this compnent due to it's cleaner code and better implementation.

The SocketProvider Component take 4 properties:

- serverUrl: the url of the server where your server socket is working.
- socketOptions: the options of the socket (see all the options [here](https://socket.io/docs/v4/client-options/)).
- onConnect: a callback function that run on socket connection.
- onDisconnect: a callback function that run on socket disconnection.

## Examples

Using the useSocket hook directly:

```js
import { useSocket } from "ngrh/use-socket";

const SomeComp = () => {
  const { socketRef, isConnecting, isDisconnected } = useSocket(
    "your-socket-server.com"
  );
  return <div>Some UI</div>;
};
```

This hook comes with a **context** component that you can use if you want to use the hooks props in nested components in the application. We recomend to use this method due to it's cleaner code and better implementation.

And here is how to use it:

```javascript
import { SocketProvider, Context as SocketContext } from "./use-socket";
import { useContext } from "react"

const ButtonComp = () => {
  const { socketRef } = useContext(SocketContext)
  return (
    <button onClick={/* Some Event */} >
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

## License

MIT
