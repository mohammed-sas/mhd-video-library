import { LikeState, LikeActions } from "../context types/like.types";

const likeReducer = (state: LikeState, actions: LikeActions):LikeState => {
  switch (actions.type) {
    case "ADD":
      return {
        ...state,
        likes: actions.payload,
      };
    case "DELETE":
      return {
        ...state,
        likes: actions.payload,
      };
    case "UPDATE":
      return {
        ...state,
        likes: actions.payload,
      };
    default:
      return state;
  }
};

export { likeReducer };
