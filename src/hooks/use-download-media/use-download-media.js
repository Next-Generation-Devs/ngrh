import { useReducer } from "react";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_LOADING": {
      const { id, fileName, chunks, loading } = action;
      return [...state, { id, chunks, fileName, loading }];
    }
    case "UPDATE_LOADING": {
      return state.map((el) => {
        if (el.id === action.id) {
          return { ...el, loading: action.loading };
        } else {
          return el;
        }
      });
    }

    case "UPDATE_CHUNKS": {
      return state.map((el) => {
        if (el.id === action.id) {
          return { ...el, chunks: action.chunks };
        } else {
          return el;
        }
      });
    }
    default: {
      return state;
    }
  }
};

/**
 * @type {types.useDownloadMedia}
 */
export const useDownloadMedia = () => {
  const [files, dispatch] = useReducer(reducer, []);

  const downloadToLocal = (id) => {
    const file = files.find((el) => el.id === id);
    if (file) {
      let blob = new Blob(file.chunks);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = file.fileName;
      a.click();
      a.remove();
    }
  };

  const getLoadingById = (id) => {
    const temp = files.find((el) => el.id === id);
    if (temp) {
      return temp.loading;
    }
    return -1;
  };

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
