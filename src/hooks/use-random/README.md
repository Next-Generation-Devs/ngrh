# The use-random hook 🚀

a hook to help generating a non-pseudo random strings.

## Usage ⚒️

The hook takes options as parameter and could be a number or object.

If the option is a number then it will be the length of the random word generated.

If the option is and object then he can contain the following props 💫:

- `length` 📏: the length of the random string (_defaults to `32`_).
- `type` 🎗️: could be individual, object or array and it determens the return type of the generate function so it could be a single word or a collection of words (_defaults to `"individual"`_).
- `amount` 📶: if the type of the random string is selected as array or object then this prop determins the size of that collection (_defaults to `5`_).
- `charset` 🔠: the group of the characters the word will be created from. We provided some of the popular charsets to use but still you can provide your own custom charset (_defaults to `"alphanumeric"`_).

The hook returns a single `generate` function to generate the random string depends on the options you give to the hook.

## Examples 💥

Using the hook to generate a random numeric string 🔢:

```js
import useRandom from "ngrh/use-random";

const Page = () => {
  const { generate } = useRandom({ length: 15, charset: "numeric" });

  const randomWord = generate(); // some random numbers

  // ...
};
```

Using the hook to generate a collection of hex strings 🔠:

```js
import useRandom from "ngrh/use-random";

const Page = () => {
  const { generate } = useRandom({
    length: 6,
    charset: "hex",
    amount: 10,
    type: "array",
  });

  const randomWordsArray = generate(); // some random array of hex chars

  // ...
};
```

## License ✅

MIT
