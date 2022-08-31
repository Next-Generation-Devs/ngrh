import * as types from "./types"; // eslint-disable-line no-unused-vars

const getType = (source) => {
  if (Array.isArray(source)) {
    return "array";
  } else if (typeof source === "object") {
    return "object";
  } else if (source) {
    return "primitive";
  }
  return null;
};

/**
 * @type {types.GetByPath}
 */

export const getByPath = (obj, path) => {
  let value = obj;
  path.split(".").forEach((s) => {
    if (s.startsWith("[")) {
      const index = s.replace(/[[\]]/g, "");
      value = value[index];
    } else {
      value = value[s];
    }
  });
  return value;
};

/**
 * @type {types.Contains}
 */

export const contains = (source, query) => {
  if (!query) return null;
  const type = getType(source);
  switch (type) {
    case "array": {
      const result = source.some((el) => contains(el, query));
      return result;
    }
    case "object": {
      const result = Object.keys(source).reduce((acc, key) => {
        if (acc) return acc;
        const value = source[key];
        const result = contains(value, query);
        return result;
      }, false);
      return result;
    }
    case "primitive": {
      if (source.toString().search(query) > -1) return true;
      else return false;
    }
    default:
      return false;
  }
};

/**
 * @type {types.FilterSearch}
 */

export const filterSearch = (source, query, strictFilter = false) => {
  if (!query) return null;
  const type = getType(source);
  switch (type) {
    case "array": {
      const arr = source
        .map((el) => filterSearch(el, query, strictFilter))
        .filter(Boolean);
      return arr;
    }
    case "object": {
      const obj = Object.keys(source).reduce((acc, key) => {
        const value = source[key];
        const result = filterSearch(value, query, strictFilter);
        if (result) {
          if (!acc) acc = {};
          if (strictFilter) {
            acc[key] = result;
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, null);
      return obj;
    }
    case "primitive": {
      if (source.toString().search(query) > -1) return source;
      else return null;
    }
    default:
      return null;
  }
};

/**
 * @type {types.FindPath}
 */

export const findPath = (source, query, parsePaths = false) => {
  if (!query) return null;
  const arr = [];
  const pushToArr = (source, path = "") => {
    const type = getType(source);
    switch (type) {
      case "array":
        {
          source.forEach((s, i) => pushToArr(s, `${path}[${i}]`));
        }
        break;
      case "object":
        {
          Object.keys(source).forEach((key) => {
            const value = source[key];
            pushToArr(value, `${path ? path + "." : ""}${key}`);
          });
        }
        break;
      case "primitive":
        {
          if (source.toString().search(query) > -1) arr.push(path);
        }
        break;
    }
  };
  pushToArr(source);
  if (parsePaths) {
    return arr.map((path) => getByPath(source, path));
  }
  return arr;
};
