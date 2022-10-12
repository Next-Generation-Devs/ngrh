export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isValidIndex = (num) => {
  return typeof num === "number" && (num / Math.floor(num) === 1 || num === 0);
};

export const initialValueMapper = (
  /**@type {Array<any>} */ initialValue,
  uuidGetter
) => {
  const arr = initialValue.map((item, i) => {
    const random =
      typeof uuidGetter === "function" ? uuidGetter() : uuidGetter[i];
    if (Array.isArray(item)) {
      return { value: item, uuid: random };
    } else if (typeof item === "object") {
      return { ...item, uuid: random };
    }
    return { value: item, uuid: random };
  });
  return arr;
};
