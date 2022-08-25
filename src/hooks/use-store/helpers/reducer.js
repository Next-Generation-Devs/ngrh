const reducer = (state, action) => {
  switch (action.type) {
    case "MUTATE_KEY":
      return {
        ...state,
        [action.key]: action.state,
      };
  }
};

export default reducer;
