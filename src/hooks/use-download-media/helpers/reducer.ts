import { HookFiles } from "types/useDownloadMediaTypes";

type ACTION_TYPE =
  | {
      /**
       * the id of the file.
       */
      id: string;
      /**
       * the action to produce.
       */
      type: "UPDATE_CHUNKS";
      /**
       * the chunks of the files.
       */
      chunks: Array<Uint8Array>;
    }
  | {
      /**
       * the id of the file.
       */
      id: string;
      /**
       * the action to produce.
       */
      type: "UPDATE_LOADING";
      /**
       * the downloading state.
       */
      loading: number;
    }
  | {
      /**
       * the id of the file.
       */
      id: string;
      /**
       * the action to produce.
       */
      type: "CREATE_LOADING";
      loading: number;
      /**
       * the chunks of the files.
       */
      chunks: Array<Uint8Array>;
      /**
       * the name of the file.
       */
      fileName: string;
    };

export const reducer = (state: Array<HookFiles>, action: ACTION_TYPE) => {
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
