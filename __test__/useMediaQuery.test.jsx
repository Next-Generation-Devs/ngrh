import { describe, it } from "vitest";
import React from "react";
import { render, act, screen } from "@testing-library/react";
import useMediaQuery from "hooks/use-media-query";

describe("test useMediaQuery", () => {
  it("should return if the size of the screen match the options or not", async () => {
    const Page = () => {
      const width = useMediaQuery({ minWidth: 992 });
      return <div>{width.toString()}</div>;
    };
    render(<Page />);
    screen.getByText("true");
    act(() => {
      globalThis.innerWidth = 500;
      globalThis.dispatchEvent(new Event("resize"));
    });
    screen.getByText("false");
  });
});
