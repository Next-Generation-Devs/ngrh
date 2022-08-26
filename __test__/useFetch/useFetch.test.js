import { describe, it, expect } from "vitest";
import useFetch from "hooks/use-fetch";
import { renderHook, waitFor } from "@testing-library/react";
import { initCache } from "hooks/use-fetch/helpers/cache";
import * as types from "hooks/use-fetch/helpers/types"; // eslint-disable-line no-unused-vars
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
createFetchMock(vi);

describe("useFetch Hook", () => {
  it("to fetch data", async () => {
    const { result } = renderHook(() =>
      useFetch("https://ngrh-test-server.onrender.com/products")
    );
    const { loading } = result.current;
    expect(loading).toEqual(true);
    await waitFor(
      () => {
        const { data, error } = result.current;
        expect(data).toBeTruthy();
        expect(error).toBeNull();
      },
      { timeout: 3000 }
    );
  });
  it("to cache data and have the cache props", async () => {
    const [get] = initCache();
    /**@type {types.CacheRecord} */
    const cachedData = get("https://ngrh-test-server.onrender.com/products");
    expect(cachedData).toHaveProperty("data");
    expect(cachedData).toHaveProperty("onMutate");
    expect(cachedData).toHaveProperty("config");
    expect(cachedData).toHaveProperty("error");
    expect(cachedData).toHaveProperty("isValidating");
    const { data, error } = cachedData;
    expect(Array.isArray(data)).toBe(true); // for this api endpoint
    expect(error).toBeNull();
  });
});
