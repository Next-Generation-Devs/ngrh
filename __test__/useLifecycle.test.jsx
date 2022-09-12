import { describe, expect, it } from "vitest";
import React, { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import useLifecycle from "hooks/use-lifecycle";
import { vi } from "vitest";

describe("test lifecycle hook", () => {
  it("shoud run the functions properly", async () => {
    const onMount = () => {};
    const onUnmount = () => {};
    const onUpdate = () => {};
    const funcs = {
      onMount,
      onUpdate,
      onUnmount,
    };
    vi.spyOn(funcs, "onMount");
    vi.spyOn(funcs, "onUnmount");
    vi.spyOn(funcs, "onUpdate");
    function Page() {
      const [state, setState] = useState(0);
      useLifecycle(
        {
          didMount: funcs.onMount,
          didUpdate: funcs.onUpdate,
          willUnmount: funcs.onUnmount,
        },
        [state]
      );
      return (
        <div>
          <div>{state}</div>
          <button onClick={() => setState(state + 1)}>click</button>
        </div>
      );
    }
    const { unmount } = render(<Page />);
    expect(funcs.onMount).toBeCalledTimes(1);
    expect(funcs.onUpdate).toBeCalledTimes(0);
    await act(async () => {
      await user.click(screen.getByText("click"));
    });
    await act(async () => {
      await user.click(screen.getByText("click"));
    });
    screen.getByText("2");
    expect(funcs.onUpdate).toBeCalledTimes(2);
    unmount();
    expect(funcs.onUnmount).toBeCalledTimes(1);
  });
});
