import { useCallback, useRef, useState } from "react";
import useRandom from "hooks/use-random";
import { deepCopy, isValidIndex, initialValueMapper } from "./helpers/utils";

import type {
  UseDynamicList,
  Selector,
  UseDynamicListReturnObject,
} from "types/useDynamicListTypes";

export const useDynamicList: UseDynamicList = (
  initialValue,
  withUUID = false
) => {
  const { generate } = useRandom(5);
  const listRef = useRef<Array<any>>(
    withUUID ? initialValueMapper(initialValue, generate) : initialValue
  );
  const uuidList = withUUID
    ? useRef<Array<string>>(listRef.current.map((el) => el.uuid))
    : useRef();

  const getIndexFromSelector = useCallback((selector: Selector) => {
    if (isValidIndex(selector)) {
      return selector as number;
    } else if (withUUID && typeof selector === "string") {
      return listRef.current.findIndex((el) => el.uuid === selector);
    }
    return -1;
  }, []);

  const [list, setList] = useState<Array<any>>(
    deepCopy(listRef.current) as Array<any>
  );

  const moveItem: UseDynamicListReturnObject["moveItem"] = useCallback(
    (currentSelector, newSelector) => {
      const currentIndex = getIndexFromSelector(currentSelector);
      const newIndex = getIndexFromSelector(newSelector);
      if (isValidIndex(currentIndex) && isValidIndex(newIndex)) {
        const item = listRef.current.splice(currentIndex as number, 1)[0];
        listRef.current.splice(newIndex as number, 0, item);
        setList(deepCopy(listRef.current) as Array<any>);
      }
    },
    []
  );

  const addItem: UseDynamicListReturnObject["addItem"] = useCallback(
    (item, atSelector) => {
      const atIndex = atSelector ? getIndexFromSelector(atSelector) : 0;
      const newItem = withUUID ? initialValueMapper([item], generate) : [item];
      if (isValidIndex(atIndex)) {
        listRef.current.splice(atIndex as number, 0, newItem[0]);
      } else {
        listRef.current.push(newItem[0]);
      }
      setList(deepCopy(listRef.current) as Array<any>);
    },
    []
  );

  const addItems: UseDynamicListReturnObject["addItems"] = useCallback(
    (items, atSelector) => {
      const atIndex = atSelector ? getIndexFromSelector(atSelector) : 0;
      const itemsArray = withUUID ? initialValueMapper(items, generate) : items;
      if (isValidIndex(atIndex)) {
        listRef.current.splice(atIndex as number, 0, ...itemsArray);
      } else {
        listRef.current.push(...itemsArray);
      }
      setList(deepCopy(listRef.current) as Array<any>);
    },
    []
  );

  const map: UseDynamicListReturnObject["map"] = useCallback((cb) => {
    if (typeof cb === "function") {
      listRef.current = listRef.current.map((...args) => {
        return cb(...args);
      });
      setList(deepCopy(listRef.current) as Array<any>);
    }
  }, []);

  const getUUID: UseDynamicListReturnObject["getUUID"] = useCallback(
    (index) => {
      if (withUUID && isValidIndex(index)) {
        return listRef.current[index].uuid;
      }
    },
    []
  );

  const getItem: UseDynamicListReturnObject["getItem"] = useCallback(
    (selector) => {
      const index = getIndexFromSelector(selector);
      if (isValidIndex(index)) {
        return listRef.current[index];
      }
    },
    []
  );

  const removeItem: UseDynamicListReturnObject["removeItem"] = useCallback(
    (selector) => {
      const index = getIndexFromSelector(selector);
      if (isValidIndex(index)) {
        listRef.current.splice(index, 1);
        setList(deepCopy(listRef.current) as Array<any>);
      }
    },
    []
  );

  const removeItems: UseDynamicListReturnObject["removeItems"] = useCallback(
    (selectors) => {
      const indexes = selectors.map(getIndexFromSelector).filter(isValidIndex);
      listRef.current = listRef.current.filter((_, i) => {
        return !indexes.includes(i);
      });
      setList(deepCopy(listRef.current) as Array<any>);
    },
    []
  );

  const getSlice: UseDynamicListReturnObject["getSlice"] = useCallback(
    (fromSelector, toSelector) => {
      const fromIndex = getIndexFromSelector(fromSelector);
      const toIndex = getIndexFromSelector(toSelector);
      if (isValidIndex(fromIndex) && isValidIndex(toIndex)) {
        return listRef.current.slice(fromIndex, toIndex);
      }
      return [];
    },
    []
  );

  const shuffle = useCallback((modify: boolean) => {
    const newList = [];
    const copyList = deepCopy(listRef.current) as Array<any>;
    for (let i = 0; i < listRef.current.length; i++) {
      const length = copyList.length;
      const now = new Date().getMilliseconds();
      const seed = Math.ceil(now * Math.random());
      const index = seed % length;
      newList.push(copyList[index]);
      copyList.splice(index, 1);
    }
    if (modify) {
      listRef.current = newList;
      setList(deepCopy(listRef.current) as Array<any>);
      return listRef.current;
    } else {
      return newList;
    }
  }, []);

  const resetList: UseDynamicListReturnObject["resetList"] = useCallback(() => {
    listRef.current = withUUID
      ? initialValueMapper(
          initialValue,
          deepCopy(uuidList.current as Array<string>) as Array<string>
        )
      : initialValue;
    setList(deepCopy(listRef.current) as Array<any>);
  }, []);

  const swap: UseDynamicListReturnObject["swap"] = useCallback(
    (firstSelector, secondSelector) => {
      const firstIndex = getIndexFromSelector(firstSelector);
      const secondIndex = getIndexFromSelector(secondSelector);
      const firstItem = listRef.current[firstIndex];
      const secondItem = listRef.current[secondIndex];
      listRef.current[firstIndex] = secondItem;
      listRef.current[secondIndex] = firstItem;
      setList(deepCopy(listRef.current) as Array<any>);
    },
    []
  );

  const reverse: UseDynamicListReturnObject["reverse"] = useCallback(() => {
    const newList = [];
    const length = listRef.current.length;
    for (let i = length - 1; i >= 0; i--) {
      newList.push(listRef.current[i]);
    }
    listRef.current = newList;
    setList(deepCopy(listRef.current) as Array<any>);
  }, []);

  return {
    list,
    moveItem,
    addItem,
    addItems,
    map,
    getUUID,
    removeItem,
    removeItems,
    getItem,
    getSlice,
    shuffleMainList: shuffle.bind({}, true),
    getShuffledList: shuffle.bind({}, false),
    resetList,
    swap,
    reverse,
  };
};
