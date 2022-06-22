import { ReactNode } from "react";
import { Dispatch } from "react";
import { Video } from "./common.types";

export type HistoryState = {
  history: Video[];
};

export interface ContextInterface {
  historyState: HistoryState;
  addToHistory: (video: Video) => {};
  deleteHistory: (id: string) => {};
  clearAllHistory: () => {};
  historyDispatch: Dispatch<HistoryActions>;
}

export type Prop={
    children:ReactNode
}

export type HistoryActions =
  | {
      type: "ADD";
      payload: Video[];
    }
  | {
      type: "DELETE";
      payload: Video[];
    }
  | {
      type: "CLEAR";
      payload: Video[];
    }
  | {
      type: "UPDATE";
      payload: Video[];
    };
