import { beforeAll, describe, it } from "vitest";
import React from "react";
import { act, render, screen } from "@testing-library/react";
import useScroll from "hooks/use-scroll";

describe("test useScroll hook", () => {
  beforeAll(() => {
    globalThis.scrollX = 0;
    globalThis.scrollY = 0;
    globalThis.scrollTo = ({ x = 0, y = 0 }) => {
      globalThis.scrollX = x;
      globalThis.scrollY = y;
      globalThis.dispatchEvent(new Event("scroll"));
    };
  });
  it("should update the scroll_y and scroll_x on scrolling", async () => {
    function Page() {
      const { scroll_y, scroll_x } = useScroll({
        scrollTypes: { x: true, y: true },
      });
      return (
        <div>
          {scroll_y}+{scroll_x}
        </div>
      );
    }
    render(<Page />);
    act(() => {
      globalThis.scrollTo({ y: 1000, x: 500 });
    });
    screen.getByText("1000+500");
  });
});
