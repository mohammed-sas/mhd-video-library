import axios from "axios";
import { createContext, useContext, useState } from "react";

const WatchLaterContext = createContext(null);


const WatchLaterProvider=({children})=>{
    const value = useWatchLaterActions();

    return(
        <WatchLaterContext.Provider value={value}>{children}</WatchLaterContext.Provider>
    )
}

const useWatchLaterActions=()=>{
    const [watchLaterState, setWatchLaterState] = useState({watchLater:[]});
    const token = localStorage.getItem("token");
    const auth = {
        headers:{
            authorization: token
        }
    };

    const addToWatchLater=async (video)=>{
        try{
            const response = await axios.post('/api/user/watchlater',{video},auth);
            if(response.status === 201){
                setWatchLaterState({
                    ...watchLaterState,
                    watchLater:response.data.watchlater
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    const deleteFromWatchLater=async (id)=>{
        try{
            const response = await axios.delete(`/api/user/watchlater/${id}`,auth);
            if(response.status === 200){
                setWatchLaterState({
                    ...watchLaterState,
                    watchLater:response.data.watchlater
                })
            }
        }catch(error){
            console.log(error);
        }
    }

    return {watchLaterState,addToWatchLater,deleteFromWatchLater};
}


const useWatchLater =()=>useContext(WatchLaterContext);


export {useWatchLater,WatchLaterProvider};