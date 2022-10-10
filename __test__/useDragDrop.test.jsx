import { describe, it } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import useDragDrop from "hooks/use-drag-drop";

describe("test drag & drop hook", () => {
  it("should apply the drop function on drop", async () => {
    function Page() {
      const onDrop = (/**@type {DragEvent} */ e) => {
        e.target.innerHTML = "full";
        const eventListener = (eve) => {
          eve.target.innerHTML = "clicked";
        };
        e.target.addEventListener("click", eventListener);
      };
      useDragDrop({ selector: "id1", onDrop });
      return (
        <div>
          <div id="id1">drop_area</div>
        </div>
      );
    }
    const { getByText } = render(<Page />);
    const element = getByText("drop_area");
    element.dispatchEvent(new Event("drop"));
    screen.getByText("full");
    await user.click(element);
    screen.getByText("clicked");
  });
});
