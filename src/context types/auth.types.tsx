import { Video } from "./common.types";
import { Playlist } from "./playlist.types";

export type User={
    _id:string,
    email:string,
    firstName:string,
    history:Video[],
    lastName:string,
    likes:Video[],
    mobile:number,
    notes:[],
    playlists:Playlist[]
}