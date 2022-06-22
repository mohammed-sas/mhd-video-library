import { Video } from "./common.types";

export interface VideoListsContext{
    videoLists:VideoListState
}

export type VideoListState={
    videos:Video[]
}