const historyReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD":
      return {
        ...state,
        history: payload,
      };
    case "DELETE":
      return {
        ...state,
        history: payload,
      };
    case "CLEAR":
      return {
        ...state,
        history: payload,
      };
    default:
      return state;
  }
};

export { historyReducer };
