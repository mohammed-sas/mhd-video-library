const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: payload,
      };
    default:
        return state;
  }
};

export {authReducer};