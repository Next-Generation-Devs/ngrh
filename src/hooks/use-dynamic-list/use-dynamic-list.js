// eslint-disable-next-line no-unused-vars
import { useCallback, useRef, useState, Ref } from "react";
import useRandom from "../use-random";
import { deepCopy, isValidIndex, initialValueMapper } from "./helpers/utils";

export const useDynamicList = (initialValue, withUUID) => {
  const { generate } = useRandom(5);
  /**@type {Ref<Array<any>>} */
  const listRef = useRef(
    withUUID ? initialValueMapper(initialValue, generate) : initialValue
  );
  const uuidList = useRef(
    withUUID ? listRef.current.map((el) => el.uuid) : undefined
  );

  const [list, setList] = useState(deepCopy(listRef.current));

  const moveItem = useCallback((currentIndex, newIndex) => {
    const item = listRef.current.splice(currentIndex, 1)[0];
    listRef.current.splice(newIndex, 0, item);
    setList(deepCopy(listRef.current));
  }, []);

  const addItem = useCallback((item, atIndex) => {
    const newItem = withUUID ? initialValueMapper([item], generate) : [item];
    if (isValidIndex(atIndex)) {
      listRef.current.splice(atIndex, 0, newItem[0]);
    } else {
      listRef.current.push(newItem[0]);
    }
    setList(deepCopy(listRef.current));
  }, []);

  const addItems = useCallback((items, atIndex) => {
    const itemsArray = withUUID ? initialValueMapper(items, generate) : items;
    if (isValidIndex(atIndex)) {
      listRef.current.splice(atIndex, 0, ...itemsArray);
    } else {
      listRef.current.push(...itemsArray);
    }
    setList(deepCopy(listRef.current));
  }, []);

  const map = useCallback((cb) => {
    if (typeof cb === "function") {
      listRef.current.map((...args) => {
        return cb(...args);
      });
      setList(deepCopy(listRef.current));
    }
  }, []);

  const getUUID = useCallback((index) => {
    if (withUUID && isValidIndex(index)) {
      return listRef.current[index].uuid;
    }
  }, []);

  const getItem = useCallback((selector) => {
    if (isValidIndex(selector)) {
      return listRef.current[selector];
    } else if (typeof selector === "string" && withUUID) {
      const index = list.findIndex((item) => item.uuid === selector);
      return listRef.current[index];
    }
  }, []);

  const removeItem = useCallback((selector) => {
    if (isValidIndex(selector)) {
      listRef.current.splice(selector, 1);
    } else if (typeof selector === "string" && withUUID) {
      const index = list.findIndex((item) => item.uuid === selector);
      listRef.current.splice(index, 1);
    }
    setList(deepCopy(listRef.current));
  }, []);

  const removeItems = useCallback((selectors) => {
    selectors.forEach((selector) => {
      if (isValidIndex(selector)) {
        listRef.current.splice(selector, 1);
      } else if (typeof selector === "string" && withUUID) {
        const index = list.findIndex((item) => item.uuid === selector);
        listRef.current.splice(index, 1);
      }
    });
    setList(deepCopy(listRef.current));
  }, []);

  const getSlice = useCallback((fromSelector, toSelector) => {
    let fromIndex;
    if (isValidIndex(fromSelector)) {
      fromIndex = fromSelector;
    } else if (typeof fromSelector === "string" && withUUID) {
      fromIndex = list.findIndex((item) => item.uuid === fromSelector);
    }
    let toIndex;
    if (isValidIndex(toSelector)) {
      toIndex = toSelector;
    } else if (typeof toSelector === "string" && withUUID) {
      toIndex = list.findIndex((item) => item.uuid === toSelector);
    }
    return listRef.current.slice(fromIndex, toIndex);
  }, []);

  const shuffle = useCallback((modify) => {
    const newList = Array.from({ length });
    const copyList = deepCopy(listRef.current);
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
      setList(deepCopy(listRef.current));
      return listRef.current;
    } else {
      return newList;
    }
  }, []);

  const resetList = useCallback(() => {
    listRef.current = withUUID
      ? initialValueMapper(initialValue, deepCopy(uuidList.current))
      : initialValue;
    setList(deepCopy(listRef.current));
  }, []);

  const swap = useCallback((firstIndex, secondIndex) => {
    const firstItem = listRef.current[firstIndex];
    const secondItem = listRef.current[secondIndex];
    listRef.current[firstIndex] = secondItem;
    listRef.current[secondIndex] = firstItem;
    setList(deepCopy(listRef.current));
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
  };
};
