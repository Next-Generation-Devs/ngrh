import { expect, describe, it } from "vitest";
import { filterSearch, findPath, contains, getByPath } from "hooks/use-search";

describe("useSearch hooks utilities", () => {
  it("filterSearch should remove non matching results", () => {
    const source = [{ a: { b: "query" } }, { c: { d: "non" } }];
    const result = filterSearch(source, "query");
    expect(result).toEqual([{ a: { b: "query" } }]);
  });
  it("filterSearch should remove non matching results even the siblings with strice filter mod", () => {
    const source = [{ a: { b: "query", f: "non" } }, { c: { d: "non" } }];
    const result = filterSearch(source, "query", true);
    expect(result).toEqual([{ a: { b: "query" } }]);
  });
  it("findPath should get the paths of the query match", () => {
    const source = [{ a: { b: "query", f: "query" } }, { c: { d: "non" } }];
    const result = findPath(source, "query");
    expect(result).toEqual(["[0].a.b", "[0].a.f"]);
  });
  it("findPath should get the value of the paths if get true as parsePaths option", () => {
    const source = [{ a: { b: "query", f: "query" } }, { c: { d: "non" } }];
    const result = findPath(source, "query", true);
    expect(result).toEqual(["query", "query"]);
  });
  it("contains should check if the query value is exist in the whole source", () => {
    const source = {
      a: { z: { x: { y: "non" } }, b: { c: { d: { e: "query" } } } },
    };
    const result = contains(source, "query");
    expect(result).toBe(true);
  });
  it("getByPath should get the value of the path", () => {
    const source = {
      a: { z: { x: { y: "non" } }, b: { c: { d: { e: "query" } } } },
    };
    const result = getByPath(source, "a.z.x.y");
    expect(result).toEqual("non");
  });
});
