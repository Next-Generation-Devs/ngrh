import * as types from "../helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @return {types.DefaultConfigurations}
 */

export const getDefaultConfig = () => {
  const defaultFetch = async (url) => {
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
