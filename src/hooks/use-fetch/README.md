# The use-fetch hook 🚀

This hook will be make the client able to fetch, cache and mutate data (the data could be on server or local).

## Usage ⚒️

This hook run fully by vanilla **fetch** api and there is no need to add any extra packages to it.

The hook tooks two parameters 💡:

- key 🗝️: which can be any string if you'll use your own **fetchProvider** or a valid api endpoint if you will to use the default provider of the hook.
- options ⚙️:
- - fetchProvider: a function that takes the key as a parameter and can return the data itself or a Promise the resolve the data.
- - revalidateOnFocus: a boolean to indicate if the data of this key will revalidate on window focus.

The hook return an object that contains 4 values:

- data ℹ️: the data resolved by the fetchProvider.
- error ⚠️: the error thrown by fetchProvider if exists.
- loading 🔃: a state to get the loading state of the data.
- mutate 💫: a function to mutate the data either on the server or just locally and it will take two parameters:
- - data: the data you want to replace your current data with (could be a promise or normal).
- - options: the options of the mutate function:
- - - revalidate: a boolean to tell the function to revalidate the data from the server (or the cache) after mutate them.
- - - tempData: a temporary data to keep the state truthy and get rid of the loading states.
- - - rollbackOnError: to get the cached data if the mutate or the revalidate is rejected (_Note that you'll not roll back to cached data on error if you provide a tempData and the cache system will use the tempData instead_).

## Examples 💥

Using the hook to fetch data with default fetchProvider ⚜️:

```js
import useFetch from "ngrh/use-fetch";

const SomeComp = () => {
  const { data, mutate, error, loading } = useFetch("SOME_VALID_END_POINT");
};
```

Using the hook to fetch data with custom fetchProvider 🧩:

```js
import useFetch from "ngrh/use-fetch";
import axios from "axios";

const fetcher = async (key) => {
  const url = key + "?q=TEST";
  try {
    const res = await axios.get(url);
  } catch (err) {
    throw err.response;
  }
  return res.data;
};

const SomeComp = () => {
  const { data, mutate, error, loading } = useFetch("SOME_VALID_END_POINT", {
    fetchProvider: fetcher,
  });
};
```

Mutating the fetched data 💫:

if the data changed on the server here will show "Mom!" and if not the data will revalidate to what exist on server or will rollback to the cached one if a Promise is rejected during the mutation. we can prevent rolling back to the cache by pass `rollbackOnError: false` to the mutate function.

```js
import useFetch from "ngrh/use-fetch";
import axios from "axios";

const updater = async (data) => {
  const res = await axios.put("SOME_VALID_END_POINT", { ...data });
  return res;
};

const SomeComp = () => {
  const { data, mutate, error, loading } = useFetch("SOME_VALID_END_POINT");

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      <p>{data.text}</p>
      <button onClick={() => mutate(updater({ text: "Mom!" }))}>
        Update Data
      </button>{" "}
    </div>
  );
};
```

Mutating the fetched data with tempData ⏲️:

Here is pretty similar to the above example except instead of waiting the data revalidate which mean it will show the old data and wait the promises to resolve, it will show the temp data while waiting. Here if an error occured, the cache will fallback to the temp data and will not rollback to the old value before mutation.

```js
import useFetch from "ngrh/use-fetch";
import axios from "axios";

const updater = async (data) => {
  const res = await axios.put("SOME_VALID_END_POINT", { ...data });
  return res;
};

const SomeComp = () => {
  const { data, mutate, error, loading } = useFetch("SOME_VALID_END_POINT");

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      <p>{data.text}</p>
      <button
        onClick={() =>
          mutate(updater({ text: "Mom!" }), { tempData: { text: "Temp" } })
        }
      >
        Update Data
      </button>{" "}
    </div>
  );
};
```

Just revalidate the data with the server 💻:

We can also just send a request to the data provider to revalidate the data by passing to the mutate function a `null` value in the first parameter and in this situation it will show the temp data until the revalidation is finished.

```js
import useFetch from "ngrh/use-fetch";

const SomeComp = () => {
  const { data, mutate, error, loading } = useFetch("SOME_VALID_END_POINT");

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      <p>{data.text}</p>
      <button onClick={() => mutate(null, { tempData: { text: "Temp" } })}>
        Update Data
      </button>{" "}
    </div>
  );
};
```

Stop revalidating ⛔:

If you're are sure of the data structure that will come from the server we can stop the data from revalidating after resolving the updater promise so that we prevent unnecessarry requests.

```js
import useFetch from "ngrh/use-fetch";
import axios from "axios";

const updater = async (data) => {
  const res = await axios.put("SOME_VALID_END_POINT", { ...data });
  return res;
};

const SomeComp = () => {
  const { data, mutate, error, loading } = useFetch("SOME_VALID_END_POINT");

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      <p>{data.text}</p>
      <button
        onClick={() =>
          mutate(updater({ text: "Mom!" }), {
            tempData: { text: "Temp" },
            revalidate: false, // will not revalidate after updating
          })
        }
      >
        Update Data
      </button>
    </div>
  );
};
```

## License ✅

MIT
