# The use-search hook 🚀

This hook will help you searching your query in deep nested arrays and objects.

## Usage ⚒️

The hook takes 2 parameters 💡:

- `source` ♨️: the source want to be searched.
- `options` ⚙️: the options of the search. Have 3 props:
- - `searchType`: the type of the search can be ("filter","check","path") (_defaults to "filter"_).
- - `strictFilter`: if you want to get the whole object that contains a match then set this to false. If set to true then it will return only the props that match the given query and delete the other props (_defaults to false_).
- - `parsePaths`: when the search type is "path" and you want to get the value of the path set this prop to true. Otherwise the results will be the paths of the values (_defaults to false_).

The hook return an object contains 3 props ✨:

- `ref` 🪝: the ref to set on the input that represents the search bar.
- `query` 🔠: the query written inside the input with the given ref.
- `result` 🎉: the result of the search.

This hook comes with some utilities used inside it and could be used seperatly for advanced customization:

1. `filterSearch` is the the utility used in the `searchType: "filter"` and it's basically filter all the results that don't match the query and takes 3 parameters 💡:

- `source` ♨️: the source to filter upon the query.
- `query` 🔠: the query of the search.
- `strictFilter` ⛔: if true then all the props that don't match the query will be removed otherwise the whole object that contains a single prop matches the query will be picked (_defaults to false_).

The function return the filtered source.

2. `findPath` is the the utility used in the `searchType: "path"` and it returns the path or the value of the path extracted using the query and takes 3 parameters 💡:

- `source` ♨️: the source to find the path from depending on the query.
- `query` 🔠: the query of the search.
- `parsePaths` ⚗️: a boolean to decide if the result will be the paths itself or the value of that paths (_defaults to false_).

If the parse path option is true then this will be an array of the values of the paths otherwise it will be array of the paths.

3. `contains` is the the utility used in the `searchType: "check"` and it returns `true` or `false` if the query match or not and takes 2 parameters 💡:

- `source` ♨️: the source to check if it's contain the given query or not.
- `query` 🔠: the query of the search.

If the given source conains the query returns true otherwise returns false.

4. `getByPath` is the utility used inside `findPath` when `parsePaths` options is true to get the value of any given path and takes 2 parameters 💡:

- `object` 📦: an array or object to get the value from by the given path.
- `path` 🛣️: the path you want to get it's value.

The function return the value of the path.

## Examples 💥

Using the hook to make a searchbar and filter some source 🔎:

Now when you start writing in the input the result will change depending on the query you write.

```js
import useSearch from "ngrh/use-search";

const Page = ({ source }) => {
  const { result, ref } = useSearch(source);

  return (
    <div>
      <input placeholder="search here" ref={ref} />
      {(result ? result : source).map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
};
```

Using the hook to get some paths matching the query 🛣️:

```js
import useSearch from "ngrh/use-search";

const Page = ({ source }) => {
  const { result, ref } = useSearch(source, { searchType: "path" });

  // the result will be something like: ["a.b.c", "[0].d"]

  return (
    <div>
      <input placeholder="search here" ref={ref} />
    </div>
  );
};
```

Using the utilities to make custom searches 🍮:

```js
import { filterSearch, contains } from "ngrh/use-search";

const Page = ({ source }) => {
  if (contains(source, "query")) {
    return <div>...</div>;
  } else {
    const result = filterSearch(source, "otherQuery", true);
    // do something
  }
};
```

## License ✅

MIT
