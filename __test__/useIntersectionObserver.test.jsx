import { act, render, screen } from "@testing-library/react";
import { beforeAll, describe, it } from "vitest";
import React, { useState, useRef } from "react";
import useIntersectionObserver from "hooks/use-intersection-observer";

describe("test use intersection observer hook", () => {
  beforeAll(() => {
    globalThis.scrollTop = 0;
    globalThis.scrollTo = (amount) => {
      globalThis.scrollTop = amount;
      globalThis.dispatchEvent(new Event("scroll"));
    };
    globalThis.IntersectionObserver = class {
      entries = [{ isIntersecting: false }];
      constructor(cb) {
        this.callback = cb;
      }
      observe = (element) => {
        element.scrollTop = 1000;
        globalThis.addEventListener("scroll", () => {
          if (globalThis.scrollTop > 1000) {
            this.entries = [{ isIntersecting: true }];
            this.callback(this.entries);
          }
        });
      };
      unobserve = () => {};
    };
  });
  it("should run the callback on intersecting", () => {
    function Page() {
      const [text, setText] = useState("hello");
      const ref = useRef();
      useIntersectionObserver(ref, {
        callback: (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setText("updated");
            }
          });
        },
      });

      return (
        <div
          style={{
            height: "2000px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>{text}</div>
          <div ref={ref}>world</div>
        </div>
      );
    }
    render(<Page />);
    screen.getByText("hello");
    act(() => {
      globalThis.scrollTo(1500);
    });
    screen.getByText("updated");
  });
});
