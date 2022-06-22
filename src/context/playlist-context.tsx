import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {playlistReducer} from '../reducer/playlistReducer'
import {Prop,ContextInterface,PlaylistData} from '../context types/playlist.types'
import { Video } from "../context types/common.types";
const PlaylistContext = createContext<ContextInterface|null>(null);


const PlaylistProvider=({children}:Prop):JSX.Element=>{
    const value = usePlaylistAction();
    
    return(
        <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
    )
}

const usePlaylistAction=()=>{
    const [playlistState, playlistDispatch] = useReducer(playlistReducer,{playlists:[]})
    const token = localStorage.getItem("token");
    const navigate =useNavigate();
    const auth = {
        headers:{
            authorization:token
        }
    };
    const addNewPlaylist=async (data:PlaylistData)=>{
        try{
            const response = await axios.post('/api/user/playlists',{playlist:data},auth);
            if(response.status === 201){
                playlistDispatch({type:"UPDATE",payload:response.data.playlists});
            }
        }catch(error){
            console.log(error);
        }
    }
    const addToPlaylist=async (id:string,video:Video)=>{
        try{
            const response = await axios.post(`/api/user/playlists/${id}`,{video},auth);
            playlistDispatch({type:"ADD_TO_PLAYLIST",payload:response.data.playlist})
        }catch(error){
            console.log(error);
        }
    }

    const removeFromPlaylist = async (id:string,video:Video)=>{
        try{
            const response = await axios.delete(`/api/user/playlists/${id}/${video._id}`,auth);
            if(response.status === 200){
                if(response.data.playlist.videos.length === 0){
                    navigate('/explore');
                }
                playlistDispatch({type:"REMOVE_FROM_PLAYLIST",payload:response.data.playlist});
            }
        }catch(error){
            console.log(error);
        }
    }
    const removePlaylist=async (id:string)=>{
        try{
            const response = await axios.delete(`/api/user/playlists/${id}`,auth);
           if(response.status === 200){
            if(response.data.playlists.length === 0){
                navigate('/explore');
            }
               playlistDispatch({type:"UPDATE",payload:response.data.playlists});
           }
        }catch(error){
            console.log(error);
        }
    }
    return {playlistState,playlistDispatch,addNewPlaylist,addToPlaylist,removeFromPlaylist,removePlaylist};
}


const usePlaylist =():ContextInterface|null=>useContext(PlaylistContext);


export {usePlaylist,PlaylistProvider};