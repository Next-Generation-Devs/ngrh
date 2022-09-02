import { useCallback, useReducer } from "react";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars
import { reducer } from "./helpers/reducer";

/**
 * @type {types.useDownloadMedia}
 */
export const useDownloadMedia = () => {
  const [files, dispatch] = useReducer(reducer, []);

  const downloadToLocal = useCallback(
    (id) => {
      const file = files.find((el) => el.id === id);
      if (file) {
        let blob = new Blob(file.chunks);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.fileName;
        a.click();
        a.remove();
      }
    },
    [files]
  );

  const getLoadingById = useCallback(
    (id) => {
      const temp = files.find((el) => el.id === id);
      if (temp) {
        return temp.loading;
      }
      return -1;
    },
    [files]
  );

  const download = async ({
    url,
    fileName = url.replace(/^.*[\\/]/g, ""),
    id,
    withAutoDownload = false,
  }) => {
    let response;
    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error(error.message);
    }
    const reader = response.body.getReader();
    const contentLength = +response.headers.get("content-length");
    let receivedLength = 0;
    let chunks = [];
    if (!files.find((el) => el.id === id)) {
      dispatch({
        type: "CREATE_LOADING",
        id: id,
        fileName,
        chunks,
        loading: 0,
      });
    }
    const condition = true;
    while (condition) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      receivedLength += value.length;
      dispatch({
        type: "UPDATE_LOADING",
        id,
        loading: Math.floor((receivedLength * 100) / contentLength),
      });
    }
    dispatch({
      type: "UPDATE_CHUNKS",
      id,
      chunks,
    });
    if (withAutoDownload) {
      let blob = new Blob(chunks);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      a.remove();
    }
  };

  return { download, getLoadingById, files, downloadToLocal };
};
