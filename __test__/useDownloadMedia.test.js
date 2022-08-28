import { renderHook, waitFor, act } from "@testing-library/react";
import useDownloadMedia from "hooks/use-download-media";
import { describe, it, expect } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
createFetchMock(vi);

describe("useDownloadMedia", () => {
  it("should set download loading to 100", async () => {
    const { result } = renderHook(() => useDownloadMedia());
    const { donwload } = result.current;
    await act(async () => {
      await donwload({
        url: "https://ngrh-test-server.onrender.com/images/test.pdf",
        id: "file1",
        fileName: "pdffile",
      });
      console.log(result.current.files);
    });
    const { getLoadingById } = result.current;
    expect(getLoadingById("file1")).toEqual(100);
    // expect(files.length).toBe(1);

    // expect(donwloadToLocal("file1")).toBeCalled();
  });
});
