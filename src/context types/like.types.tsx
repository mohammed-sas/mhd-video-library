import { Dispatch } from "react";
import { Video } from "./common.types";

export type LikeState = {
  likes: Video[];
};

export interface ContextInterface {
  likeState: LikeState;
  addToLikes: (video: Video) => {};
  deleteFromLikes: (id: string) => {};
  likeDispatch: Dispatch<LikeActions>;
}


export type LikeActions =
  | {
      type: "ADD";
      payload: Video[];
    }
  | {
      type: "DELETE";
      payload: Video[];
    }
  | {
      type: "UPDATE";
      payload: Video[];
    };
