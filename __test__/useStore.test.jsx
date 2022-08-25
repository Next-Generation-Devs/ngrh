import { render, renderHook, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import useStore, { useGlobalStore } from "hooks/use-store";
import { describe, it, expect } from "vitest";
import randomstring from "randomstring";
import { act } from "react-dom/test-utils";
import React from "react";

describe("Test use store hook", () => {
  it("should store the data", () => {
    const key = randomstring.generate(15);
    const { result } = renderHook(() => useStore(key, { name: "test" }));
    expect(result.current.state).toEqual({ name: "test" });
  });
  it("will be able to update the state", () => {
    const key = randomstring.generate(15);
    const { result } = renderHook(() => useStore(key, { name: "test" }));
    act(() => result.current.setState({ name: "update" }));
    expect(result.current.state).toEqual({ name: "update" });
  });
  it("will share the state with the global store", () => {
    const key = randomstring.generate(15);
    renderHook(() => useStore(key, { name: "test" }));
    function Page() {
      const { store } = useGlobalStore();
      return <div>{store[key].name}</div>;
    }
    render(<Page />);
    screen.getByText("test");
  });
  it("will be able to update the state from the global store", async () => {
    const key = randomstring.generate(15);
    renderHook(() => useStore(key, { name: "test" }));
    function Page() {
      const { store, updateStoreData } = useGlobalStore();
      return (
        <>
          <div>{store[key].name}</div>;
          <button onClick={() => updateStoreData(key, { name: "update" })}>
            click
          </button>
        </>
      );
    }
    render(<Page />);
    await user.click(screen.getByText("click"));
    screen.getByText("update");
  });
});
