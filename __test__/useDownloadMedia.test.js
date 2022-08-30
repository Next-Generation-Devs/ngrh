import { act, renderHook, waitFor } from "@testing-library/react";
import useDownloadMedia from "hooks/use-download-media";
import { describe, it, beforeAll, expect } from "vitest";

const sleep = async (amount) => {
  await new Promise((res) =>
    setTimeout(res, Math.floor(Math.random() * amount))
  );
};

describe("useDownloadMedia", () => {
  beforeAll(() => {
    // eslint-disable-next-line no-undef
    global.fetch = () =>
      new Promise((resolve) => {
        resolve({
          headers: {
            get() {
              return 100;
            },
          },
          body: {
            getReader() {
              let i = 0;
              return {
                async read() {
                  if (i < 100) {
                    i++;
                    await sleep(5);
                    return {
                      value: { length: 1 },
                      done: false,
                    };
                  }
                  return { value: undefined, done: true };
                },
              };
            },
          },
        });
      });
  });
  it("should set download loading to 100", async () => {
    const { result } = renderHook(() => useDownloadMedia());
    const { download } = result.current;
    act(() => {
      download({
        url: "https://ngrh-test-server.onrender.com/images/test.pdf",
        id: "1",
        fileName: "testFile",
      });
    });
    await waitFor(
      () => {
        const downloaded = result.current.getLoadingById("1");
        expect(downloaded).toEqual(100);
      },
      { timeout: 3000 }
    );
  });
});
