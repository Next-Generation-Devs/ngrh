import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import useSearch from "hooks/use-search";
import { describe, it, expect } from "vitest";
import React from "react";

describe("useSearch hook", () => {
  it("should give a ref and have an input event listener", async () => {
    function Page() {
      const { ref, query } = useSearch();
      return (
        <div>
          <input placeholder="input" ref={ref} />
          <div>{query}</div>
        </div>
      );
    }
    render(<Page />);
    await user.type(screen.getByPlaceholderText("input"), "query");
    screen.getByText("query");
  });
  it("should return the right results", async () => {
    function Page() {
      const source = { a: { b: "query" }, c: { s: "non" } };
      const { ref, result } = useSearch(source);
      return (
        <div>
          <input placeholder="input" ref={ref} />
          <div data-testid="result">{JSON.stringify(result)}</div>
        </div>
      );
    }
    render(<Page />);
    await user.type(screen.getByPlaceholderText("input"), "query");
    const element = screen.getByTestId("result");
    const obj = JSON.parse(element.textContent);
    expect(obj).toEqual({ a: { b: "query" } });
  });
  it("should take search type option", async () => {
    function Page() {
      const source = { a: { b: "query", m: "non" }, c: { s: "non" } };
      const { ref, result } = useSearch(source, { searchType: "path" });
      return (
        <div>
          <input placeholder="input" ref={ref} />
          <div data-testid="result">{JSON.stringify(result)}</div>
        </div>
      );
    }
    render(<Page />);
    await user.type(screen.getByPlaceholderText("input"), "query");
    const element = screen.getByTestId("result");
    const obj = JSON.parse(element.textContent);
    expect(obj).toEqual(["a.b"]);
  });
  it("should take strict-filter option", async () => {
    function Page() {
      const source = { a: { b: "query", m: "non" }, c: { s: "non" } };
      const { ref, result } = useSearch(source, { strictFilter: true });
      return (
        <div>
          <input placeholder="input" ref={ref} />
          <div data-testid="result">{JSON.stringify(result)}</div>
        </div>
      );
    }
    render(<Page />);
    await user.type(screen.getByPlaceholderText("input"), "query");
    const element = screen.getByTestId("result");
    const obj = JSON.parse(element.textContent);
    expect(obj).toEqual({ a: { b: "query" } });
  });
  it("should take parsePaths option", async () => {
    function Page() {
      const source = { a: { b: "query", m: "non" }, c: { s: "non" } };
      const { ref, result } = useSearch(source, {
        searchType: "path",
        parsePaths: true,
      });
      return (
        <div>
          <input placeholder="input" ref={ref} />
          <div data-testid="result">{JSON.stringify(result)}</div>
        </div>
      );
    }
    render(<Page />);
    await user.type(screen.getByPlaceholderText("input"), "query");
    const element = screen.getByTestId("result");
    const obj = JSON.parse(element.textContent);
    expect(obj).toEqual(["query"]);
  });
});
