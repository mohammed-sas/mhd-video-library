import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LikeContext = createContext(null);

const LikeProvider = ({children})=>{
    const value = useLikeActions();
    return(
        <LikeContext.Provider value={value}>{children}</LikeContext.Provider>
    )
}

const useLikeActions=()=>{
    const [likeState,setLikeState]= useState({likes:[]});
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const auth= {
        headers:{
            authorization:token
        }
    }
    const addToLikes=async (video)=>{
        try{
            const response = await axios.post('/api/user/likes',{video},auth);
            if(response.status === 201){
                setLikeState({
                    ...likeState,
                    likes:response.data.likes
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    const deleteFromLikes=async (id)=>{
        try{
            const response = await axios.delete(`/api/user/likes/${id}`,auth);
            if(response.status === 200){
                setLikeState({
                    ...likeState,
                    likes:response.data.likes
                })
                if(response.data.likes.length ===0 )
                    navigate("/explore");
            }
        }catch(error){
            console.log(error);
        }
    }

    return {likeState,addToLikes,deleteFromLikes};
}

const useLike=()=>useContext(LikeContext);


export {useLike,LikeProvider};