import {
  Contains,
  FilterSearch,
  FindPath,
  GetByPath,
  GetType,
} from "types/useSearchTypes";

type extractGeneric<Type> = Type extends FindPath<infer X> ? X : never;

const getType: GetType = (source) => {
  if (Array.isArray(source)) {
    return "array";
  } else if (typeof source === "object") {
    return "object";
  } else if (source) {
    return "primitive";
  }
  return null;
};

export const getByPath: GetByPath = (obj, path) => {
  let value = obj as any;
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

export const contains: Contains = (source, query) => {
  if (!query) return null;
  const type = getType(source);
  switch (type) {
    case "array": {
      const result = (source as Array<any>).some((el) => contains(el, query));
      return result;
    }
    case "object": {
      const result = Object.keys(source).reduce<boolean>((acc, key) => {
        if (acc) return acc;
        const value = source[key];
        const result = contains(value, query);
        return Boolean(result);
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

export const filterSearch: FilterSearch = (
  source,
  query,
  strictFilter = false
) => {
  if (!query) return null;
  const type = getType(source);
  switch (type) {
    case "array": {
      const arr = source
        .map((el: any) => filterSearch(el, query, strictFilter))
        .filter(Boolean);
      return arr;
    }
    case "object": {
      const obj = Object.keys(source).reduce<any>((acc, key) => {
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

export const findPath: FindPath = (source, query, parsePaths = false) => {
  if (!query) return null;
  const arr: Array<string> = [];
  const pushToArr: (source: any, path?: string) => void = (
    source,
    path = ""
  ) => {
    const type = getType(source);
    switch (type) {
      case "array":
        {
          (source as Array<any>).forEach((s, i) =>
            pushToArr(s, `${path}[${i}]`)
          );
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
    const newArr = arr.map((path) =>
      getByPath<extractGeneric<FindPath>>(source, path)
    );
    return newArr;
  }
  return arr;
};
