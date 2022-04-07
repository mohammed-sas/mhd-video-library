import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {likeReducer} from '../reducer/likeReducer';
const LikeContext = createContext(null);

const LikeProvider = ({children})=>{
    const value = useLikeActions();
    return(
        <LikeContext.Provider value={value}>{children}</LikeContext.Provider>
    )
}

const useLikeActions=()=>{
    const [likeState,likeDispatch]=useReducer(likeReducer,{likes:[]});
    const token = localStorage.getItem("token");
    const auth= {
        headers:{
            authorization:token
        }
    }
    const addToLikes=async (video)=>{
        try{
            const response = await axios.post('/api/user/likes',{video},auth);
            if(response.status === 201){
                likeDispatch({type:"ADD",payload:response.data.likes});
            }
        }catch(error){
            console.log(error);
        }
    }
    const deleteFromLikes=async (id)=>{
        try{
            const response = await axios.delete(`/api/user/likes/${id}`,auth);
            if(response.status === 200){
                likeDispatch({type:"DELETE",payload:response.data.likes});
            }
        }catch(error){
            console.log(error);
        }
    }

    return {likeState,addToLikes,deleteFromLikes,likeDispatch};
}

const useLike=()=>useContext(LikeContext);


export {useLike,LikeProvider};