import { Dispatch,ReactNode } from "react";

export type WatchLater = {
  _id: string;
  youtubeId: string;
  title: string;
  description: string;
  videoThumbnail: string;
  channelTitle: string;
  category: string;
  channelThumbnail: string;
};

export type WatchLaterState={
    watchLater:WatchLater[]
}

export type Props={
    children:ReactNode
}

export type WatchLaterActions =
  | {
      type: "ADD";
      payload: WatchLater[];
    }
  | {
      type: "DELETE";
      payload: WatchLater[];
    }
  | {
      type: "UPDATE";
      payload: WatchLater[];
    };

export interface WatchLaterContextInterface {
  watchLaterState: WatchLaterState;
  addToWatchLater: (vide:WatchLater) => {};
  deleteFromWatchLater: (id:string) => {};
  watchLaterDispatch:Dispatch<WatchLaterActions>
  
}
