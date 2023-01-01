import type { GetDefaultConfig } from "types/useFetchTypes";

export const getDefaultConfig: GetDefaultConfig = () => {
  const defaultFetch = async (url: string) => {
    const response = await fetch(url, { method: "GET", keepalive: true });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };

  return {
    fetchProvider: defaultFetch,
    revalidateOnFocus: true,
  };
};
