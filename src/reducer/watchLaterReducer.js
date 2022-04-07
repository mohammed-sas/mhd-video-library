const watchLaterReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD":
      return {
        ...state,
        watchLater: payload,
      };
    case "DELETE":
      return {
        ...state,
        watchLater: payload,
      };
    case "UPDATE":
      return {
        ...state,
        watchLater: payload,
      };
    default:
      return state;
  }
};

export { watchLaterReducer };
