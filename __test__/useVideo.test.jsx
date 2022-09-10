import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import React from "react";
import { useRef } from "react";
import useVideo from "hooks/use-video";

// eslint-disable-next-line react/prop-types
function Page({ func, args = [] }) {
  const ref = useRef();
  const hook = useVideo(ref);
  return (
    <div>
      <button
        onClick={() => {
          hook[func](...args);
        }}
      >
        click
      </button>
      <video data-testid="video" ref={ref} />
    </div>
  );
}

describe("test useVideo hook", () => {
  beforeAll(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "paused", {
      value: true,
      writable: true,
    });
    HTMLMediaElement.prototype.play = function () {
      this.paused = false;
      this.currentTime = 1;
    };
  });
  it("should play the video", async () => {
    render(<Page func="onOffVideo" />);
    await user.click(screen.getByText("click"));
    /**@type {HTMLVideoElement} */
    const element = screen.getByTestId("video");
    expect(element.paused).toBe(false);
    expect(element.currentTime).toBeGreaterThan(0);
  });
  it("should change the video speed", async () => {
    render(<Page func="changePlaySpeed" args={[2]} />);
    await user.click(screen.getByText("click"));
    /**@type {HTMLVideoElement} */
    const element = screen.getByTestId("video");
    expect(element.playbackRate).toBe(2);
  });
  it("should loop the video", async () => {
    render(<Page func="toggleLooping" />);
    await user.click(screen.getByText("click"));
    /**@type {HTMLVideoElement} */
    const element = screen.getByTestId("video");
    expect(element.loop).toBe(true);
  });
  it("should change the quality of the video", async () => {
    function Page() {
      const ref = useRef();
      const { changeQuality, playVideo } = useVideo(ref);
      return (
        <div>
          <button
            onClick={() => {
              playVideo();
              changeQuality(1);
            }}
          >
            click
          </button>
          <video data-testid="video" ref={ref}>
            <source
              src="https://ngrh-test-server.onrender.com/images/RabbitMQ%20in%20100%20Seconds.mp4"
              type="video/mp4"
            />
            <source
              src="https://ngrh-test-server.onrender.com/images/videoplayback.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      );
    }
    render(<Page func="toggleLooping" />);
    await user.click(screen.getByText("click"));
    /**@type {HTMLVideoElement} */
    const element = screen.getByTestId("video");
    expect(element.src).toBe(
      "https://ngrh-test-server.onrender.com/images/videoplayback.mp4"
    );
    expect(element.currentTime).toBe(1);
    expect(element.paused).toBe(false);
  });
  it("should skip video time", async () => {
    render(<Page func="skipTime" />);
    await user.click(screen.getByText("click"));
    await user.click(screen.getByText("click"));
    /**@type {HTMLVideoElement} */
    const element = screen.getByTestId("video");
    expect(element.currentTime).toBe(10);
  });
});
