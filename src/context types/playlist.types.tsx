import { Dispatch, ReactNode } from "react"
import { Video } from "./common.types"

export type Prop={
    children:ReactNode
}

export type PlaylistData={
    title:string,
    description:string
}

export interface ContextInterface{
    playlistState:PlayListState,
    playlistDispatch:Dispatch<PlaylistActions>,
    addNewPlaylist:(data:PlaylistData)=>{},
    addToPlaylist:(id:string,video:Video)=>{},
    removeFromPlaylist:(id:string,video:Video)=>{},
    removePlaylist:(id:string)=>{}

}
export type Playlist={
    _id:string,
    description:string,
    title:string,
    videos:Video[],
    
}
export type PlayListState={
    playlists:Playlist[]
}

export type PlaylistActions=
|{
    type:"UPDATE",
    payload:Playlist[] | []
}
|{
    type:"ADD_TO_PLAYLIST",
    payload:Playlist
}
|{
    type:"REMOVE_FROM_PLAYLIST",
    payload:Playlist
}


