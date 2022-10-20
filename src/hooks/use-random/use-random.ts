import { useCallback } from "react";
import { getDefaultOptions } from "./helpers/options";
import { getSet } from "./helpers/charsets";
import { generateRandom } from "./helpers/utils";

import type {
  Generate,
  GenerateFromNumber,
  RandomObject,
  UseRandom,
} from "types/useRandomTypes";

export const useRandom: UseRandom = (opt) => {
  const defaultOptions = getDefaultOptions();
  const options =
    typeof opt === "number" ? opt : Object.assign({}, defaultOptions, opt);

  const generateFromNumber: GenerateFromNumber = useCallback((options) => {
    return generateRandom(options, getSet("alphanumeric"));
  }, []);

  const generate: Generate = useCallback((options) => {
    switch (options.type) {
      case "individual":
        return generateRandom(options.length, getSet(options.charset));
      case "object": {
        const obj: RandomObject = {};
        Array.from({ length: options.amount }).forEach((_, i) => {
          obj[i] = generateRandom(options.length, getSet(options.charset));
        });
        return obj;
      }
      case "array": {
        const arr: Array<string> = [];
        Array.from({ length: options.amount }).forEach(() => {
          arr.push(generateRandom(options.length, getSet(options.charset)));
        });
        return arr;
      }
    }
  }, []);

  return {
    generate:
      typeof options === "number"
        ? () => generateFromNumber(options)
        : () => generate(options),
  };
};
