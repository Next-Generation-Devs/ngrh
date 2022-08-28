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
 * @type {types.useFetch}
 */
function useDownloadMedia() {
  const [files, dispatch] = useReducer(reducer, []);

  /**
   * @type {types.download}
   */
  const donwload = async ({
    url,
    fileName = url.replace(/^.*[\\/]/g, ""),
    id,
  }) => {
    try {
      let response = await fetch(url);

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
      // eslint-disable-next-line no-constant-condition
      while (true) {
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
    } catch (error) {
      console.log(error.message);
    }
  };
  /**
   * @type {types.donwloadToLocal}
   */
  const donwloadToLocal = (id) => {
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
  /**
   * @type {types.getLoadingById}
   */
  const getLoadingById = (id) => {
    const temp = files.find((el) => el.id === id);
    if (temp) {
      return temp.loading;
    }
    return -1;
  };

  return { donwload, getLoadingById, files, donwloadToLocal };
}
export default useDownloadMedia;
