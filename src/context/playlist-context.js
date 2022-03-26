import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import {playlistReducer} from '../reducer/playlistReducer'

const PlaylistContext = createContext(null);


const PlaylistProvider=({children})=>{
    const value = usePlaylistAction();
    
    return(
        <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
    )
}

const usePlaylistAction=()=>{
    const [playlistState, playlistDispatch] = useReducer(playlistReducer,{playlists:[]})
    const token = localStorage.getItem("token");
    const auth = {
        headers:{
            authorization:token
        }
    };
    const addNewPlaylist=async (data)=>{
        try{
            const response = await axios.post('api/user/playlists',{playlist:data},auth);
            if(response.status === 201){
                playlistDispatch({type:"UPDATE",payload:response.data.playlists});
            }
        }catch(error){
            console.log(error);
        }
    }
    const addToPlaylist=async (id,video)=>{
        try{
            const response = await axios.post(`/api/user/playlists/${id}`,{video},auth);
            playlistDispatch({type:"ADD_TO_PLAYLIST",payload:response.data.playlist})
        }catch(error){
            console.log(error);
        }
    }

    const removeFromPlaylist = async (id,video)=>{
        try{
            const response = await axios.delete(`api/user/playlists/${id}/${video._id}`,auth);
            if(response.status === 200){
                playlistDispatch({type:"REMOVE_FROM_PLAYLIST",payload:response.data.playlist});
            }
        }catch(error){
            console.log(error);
        }
    }
    return {playlistState,playlistDispatch,addNewPlaylist,addToPlaylist,removeFromPlaylist};
}


const usePlaylist =()=>useContext(PlaylistContext);


export {usePlaylist,PlaylistProvider};