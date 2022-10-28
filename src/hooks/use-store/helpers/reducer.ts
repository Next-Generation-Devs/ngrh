import { ACTION_TYPE } from "types/useStoreTypes";

const reducer = (state: Record<string, any>, action: ACTION_TYPE) => {
  switch (action.type) {
    case "MUTATE_KEY":
      return {
        ...state,
        [action.key]: action.state,
      };
    default:
      return state;
  }
};

export default reducer;
