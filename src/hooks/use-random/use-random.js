import { useCallback } from "react";
import { getDefaultOptions } from "./helpers/options";
import { getSet } from "./helpers/charsets";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useRandom}
 */

export const useRandom = (opt) => {
  const defaultOptions = getDefaultOptions();
  const options =
    typeof opt === "number" ? opt : Object.assign({}, defaultOptions, opt);

  const generateRandom = (length, charset) => {
    const now = new Date().getMilliseconds();
    const charLen = charset.length;
    let str = "";
    Array.from({ length }).forEach(() => {
      const seed = Math.ceil(now * Math.random());
      const index = charLen - (seed % charLen) - 1;
      str += charset[index];
    });
    return str;
  };

  const generate = useCallback((options) => {
    if (typeof options === "number") {
      return generateRandom(options, getSet("alphanumeric"));
    }
    switch (options.type) {
      case "individual":
        return generateRandom(options.length, getSet(options.charset));
      case "object": {
        const obj = {};
        Array.from({ length: options.amount }).forEach((_, i) => {
          obj[i] = generateRandom(options.length, getSet(options.charset));
        });
        return obj;
      }
      case "array": {
        const arr = [];
        Array.from({ length: options.amount }).forEach(() => {
          arr.push(generateRandom(options.length, getSet(options.charset)));
        });
        return arr;
      }
    }
  }, []);

  return {
    generate: () => generate(options),
  };
};
