import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDynamicList from "hooks/use-dynamic-list";

describe("test dynamic list hook", () => {
  it("should return list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2]));
    const { list } = result.current;
    expect(list).toEqual([0, 1, 2]);
  });
  it("should add item and items to the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2]));
    const { list, addItem, addItems } = result.current;
    expect(list).toEqual([0, 1, 2]);
    act(() => {
      addItem(3);
    });
    expect(result.current.list).toEqual([0, 1, 2, 3]);
    act(() => {
      addItems([4, 5]);
    });
    expect(result.current.list).toEqual([0, 1, 2, 3, 4, 5]);
  });
  it("should add item at specific index to the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2]));
    const { list, addItem } = result.current;
    expect(list).toEqual([0, 1, 2]);
    act(() => {
      addItem(3, 1);
    });
    expect(result.current.list).toEqual([0, 3, 1, 2]);
  });
  it("should get item at specific selector from the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2], true));
    const { list, getItem } = result.current;
    expect(getItem(0).value).toEqual(0);
    expect(getItem(list[1].uuid).value).toEqual(1);
  });
  it("should get slice from the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2, 3]));
    const { getSlice } = result.current;
    expect(getSlice(0, 2)).toEqual([0, 1]);
  });
  it("should get uuid at index from the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2], true));
    const { getUUID } = result.current;
    expect(getUUID(0)).toBeTypeOf("string");
  });
  it("should map the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2]));
    const { map } = result.current;
    act(() => {
      map((num) => {
        return num + 1;
      });
    });
    expect(result.current.list).toEqual([1, 2, 3]);
  });
  it("should an item in the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2]));
    const { moveItem } = result.current;
    act(() => {
      moveItem(0, 2);
    });
    expect(result.current.list).toEqual([1, 2, 0]);
  });
  it("should remove an item and items from the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2, 3, 4, 5]));
    const { removeItem, removeItems } = result.current;
    act(() => {
      removeItem(0);
    });
    expect(result.current.list).toEqual([1, 2, 3, 4, 5]);
    act(() => {
      removeItems([3, 4]);
    });
    expect(result.current.list).toEqual([1, 2, 3]);
  });
  it("should reset the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2]));
    const { resetList, map } = result.current;
    act(() => {
      map(Boolean);
    });
    expect(result.current.list).toEqual([false, true, true]);
    act(() => {
      resetList();
    });
    expect(result.current.list).toEqual([0, 1, 2]);
  });
  it("should swap item in the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2]));
    const { swap } = result.current;
    act(() => {
      swap(0, 2);
    });
    expect(result.current.list).toEqual([2, 1, 0]);
  });
  it("should reverse the list", async () => {
    const { result } = renderHook(() => useDynamicList([0, 1, 2, 3]));
    const { reverse } = result.current;
    act(() => {
      reverse();
    });
    expect(result.current.list).toEqual([3, 2, 1, 0]);
  });
});
