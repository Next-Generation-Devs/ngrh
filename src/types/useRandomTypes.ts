export type GetSet = (
  /** the char set that could be one of the standarts or a custom one. */ charset: string
) => string;

export interface DefaultOptions {
  /** could be individual, object or array and it determens the return type of the generate function so it could be a single word or a collection of words (_defaults to `"individual"`_). */ type:
    | "individual"
    | "object"
    | "array";
  /** the length of the random string (_defaults to `32`_). */ length: number;
  /** the group of the characters the word will be created from. We provided some of the popular charsets to use but still you can provide your own custom charset (_defaults to `"alphanumeric"`_). */ charset: string;
  /** if the type of the random string is selected as array or object then this prop determins the size of that collection (_defaults to `5`_). */ amount: number;
}

export interface FinalOptions extends DefaultOptions {}

export type GetDefaultOptions = () => DefaultOptions;

export type GenerateRandom = (
  /** the length of the word. */ length: number,
  /** the charset of the generated word. */ charset: string
) => string;

export type RandomObject = { [key: number]: string };

export type GenerateFromNumber = (options: number) => string;

export type Generate = (
  options: FinalOptions
) => string | Array<string> | RandomObject;

export interface UseRandomReturnObject {
  /** a function to create the random string, object or array depends on the options you gave the hook. */ generate: () => ReturnType<Generate>;
}

export type UseRandom = (
  /** the options of the random value you want the generate function to generate upon them. */ opt:
    | number
    | Partial<DefaultOptions>
) => UseRandomReturnObject;
