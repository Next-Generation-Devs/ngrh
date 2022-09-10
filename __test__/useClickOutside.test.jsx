import { describe, it } from "vitest";
import React, { useRef, useState } from "react";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import useClickOutside from "hooks/use-click-outside";

describe("test useClickOutside hook", () => {
  it("should run onClickOutside on click outside", async () => {
    function Page() {
      const [state, setState] = useState("open");
      const ref = useRef();
      useClickOutside(ref, {
        onClickOutside: () => {
          setState("closed");
        },
      });
      return (
        <div>
          <div>{state}</div>
          <div style={{ width: "100px", height: "100px" }} ref={ref}>
            in
          </div>
          <div style={{ width: "100px", height: "100px" }} ref={ref}>
            out
          </div>
        </div>
      );
    }
    render(<Page />);
    await act(async () => {
      user.click(screen.getByText("in"));
    });
    screen.getByText("open");
    await act(async () => {
      user.click(screen.getByText("out"));
    });
    screen.getByText("closed");
  });
});
