import { renderHook } from "@testing-library/react";
import useRandom from "hooks/use-random";
import { describe, it, expect } from "vitest";

describe("test use-random hook", () => {
  it("should not be sequential random numbers", () => {
    const { result } = renderHook(() => useRandom(5));
    const arr = [];
    Array.from({ length: 1000 }).forEach(() => {
      arr.push(result.current.generate());
    });
    expect(arr.length).toEqual(new Set(arr).size);
  });
  it("should have default alphanumeric charset and 32 length", () => {
    const { result } = renderHook(() => useRandom());
    const word = result.current.generate();
    expect(word).toHaveLength(32);
    expect(word).toMatch(/[A-z]{1,}[0-9]{1,}/g);
  });
  it("should accept length option", () => {
    const { result } = renderHook(() => useRandom(10));
    const word = result.current.generate();
    expect(word).toHaveLength(10);
    expect(word).toMatch(/[A-z]{1,}[0-9]{1,}/g);
  });
  it("should accept object from options", () => {
    const { result } = renderHook(() =>
      useRandom({ length: 15, charset: "numeric" })
    );
    const word = result.current.generate();
    expect(word).toMatch(/^[0-9]{15}$/g);
  });
  it("should be able to return an object of randoms", () => {
    const { result } = renderHook(() =>
      useRandom({ length: 20, charset: "binary", type: "object", amount: 5 })
    );
    const object = result.current.generate();
    expect(Object.keys(object)).toHaveLength(5);
    Object.values(object).forEach((item) => {
      expect(item).toMatch(/^[0-1]{20}$/g);
    });
  });
  it("should be able to return an array of randoms", () => {
    const { result } = renderHook(() =>
      useRandom({ length: 15, charset: "octal", type: "array", amount: 7 })
    );
    const arr = result.current.generate();
    expect(arr).toHaveLength(7);
    arr.forEach((item) => {
      expect(item).toMatch(/^[0-7]{15}$/g);
    });
  });
});
