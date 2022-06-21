import axios from "axios";
import { createContext, useContext, useReducer } from "react";

import {watchLaterReducer} from '../reducer/watchLaterReducer'; 
import {WatchLaterContextInterface,Props,WatchLater} from '../context types/watchLater.types';
const WatchLaterContext = createContext<WatchLaterContextInterface|null>(null);


const WatchLaterProvider=({children}:Props)=>{
    const value = useWatchLaterActions();

    return(
        <WatchLaterContext.Provider value={value}>{children}</WatchLaterContext.Provider>
    )
}

const useWatchLaterActions=()=>{
    const [watchLaterState,watchLaterDispatch]=useReducer(watchLaterReducer,{watchLater:[]});
    const token = localStorage.getItem("token");
    const auth = {
        headers:{
            authorization: token
        }
    };

    const addToWatchLater=async (video:WatchLater)=>{
        try{
            const response = await axios.post('/api/user/watchlater',{video},auth);
            if(response.status === 201){
                watchLaterDispatch({type:"ADD",payload:response.data.watchlater});
            }
        }catch(error){
            console.log(error);
        }
    }
    const deleteFromWatchLater=async (id:string)=>{
        try{
            const response = await axios.delete(`/api/user/watchlater/${id}`,auth);
            if(response.status === 200){
                watchLaterDispatch({type:"DELETE",payload:response.data.watchlater});
            }
        }catch(error){
            console.log(error);
        }
    }

    return {watchLaterState,addToWatchLater,deleteFromWatchLater,watchLaterDispatch};
}


const useWatchLater =()=>useContext(WatchLaterContext);


export {useWatchLater,WatchLaterProvider};