import { describe, it, expect } from "vitest";
import useFetch from "hooks/use-fetch";
import { renderHook, waitFor, act } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import randomstring from "randomstring";
import { vi } from "vitest";
import { initCache } from "hooks/use-fetch/helpers/cache";
createFetchMock(vi);

const fetcher = async () => {
  const res = await fetch("https://ngrh-test-server.onrender.com/products");
  const data = await res.json();
  return data;
};

const updater = async (id, newName) => {
  await fetch(`https://ngrh-test-server.onrender.com/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name: newName }),
    headers: { "content-type": "application/json" },
  });
  return null;
};

describe("mutate test", () => {
  it("test normal mutate without validation", async () => {
    const key = randomstring.generate(15);
    const { result } = renderHook(() =>
      useFetch(key, { fetchProvider: fetcher })
    );
    await waitFor(() => expect(result.current.data[0].id).toEqual(1), {
      timeout: 3000,
    });
    const { mutate } = result.current;
    act(() => {
      mutate({ name: "update" }, { revalidate: false });
    });
    const { data } = result.current;
    expect(data.name).toEqual("update");
  });
  it("test tempData and validating", async () => {
    const key = randomstring.generate(15);
    const { result } = renderHook(() =>
      useFetch(key, { fetchProvider: fetcher })
    );
    await waitFor(() => expect(result.current.data[0].id).toEqual(1), {
      timeout: 3000,
    });
    const { mutate } = result.current;
    act(() => {
      mutate(null, { tempData: { name: "temp" } });
    });
    expect(result.current.data.name).toEqual("temp");
    await waitFor(() => expect(result.current.data[0].id).toEqual(1), {
      timeout: 3000,
    });
  });
  it("test mutate on server", async () => {
    const key = randomstring.generate(15);
    const { result } = renderHook(() =>
      useFetch(key, { fetchProvider: fetcher })
    );
    await waitFor(() => expect(result.current.data[0].id).toEqual(1), {
      timeout: 3000,
    });
    const { mutate } = result.current;
    const newName = randomstring.generate(10);
    act(() => {
      mutate(updater(2, newName), { tempData: "updating" });
    });
    expect(result.current.data).toEqual("updating");
    await waitFor(() => expect(result.current.data[1].name).toEqual(newName), {
      timeout: 10000,
    });
  });
  it("test mutate in cache", async () => {
    const key = randomstring.generate(15);
    const { result } = renderHook(() =>
      useFetch(key, { fetchProvider: fetcher })
    );
    await waitFor(() => expect(result.current.data[0].id).toEqual(1), {
      timeout: 3000,
    });
    const { mutate } = result.current;
    const newName = randomstring.generate(10);
    await act(async () => {
      await mutate(updater(3, newName), { tempData: "updating" });
    });
    const [get] = initCache();
    const cached = get(key);
    expect(cached.data[2].name).toEqual(newName);
  });
});
