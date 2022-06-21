import { Video } from "./common.types"

export type PlayListState={
    playlists:Video[]
}

export type PlaylistActions=
|{
    type:"FETCHING",
    payload:null
}
|{
    type:"FETCHED",
    payload:Video[]
}
|{
    type:"UPDATE",
    payload:Video[]
}
|{
    type:"ADD_TO_PLAYLIST",
    payload:Video
}
|{
    type:"REMOVE_FROM_PLAYLIST",
    payload:Video
}


