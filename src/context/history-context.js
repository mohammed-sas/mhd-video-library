import axios from "axios";
import { createContext, useContext, useReducer } from 'react';
import {historyReducer} from '../reducer/historyReducer';

const HistoryContext = createContext(null);

const HistoryProvider =({children}) =>{
    const value = useHistoryActions();
    return (
        <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
    )
}

const useHistoryActions=()=>{
    const [historyState,historyDispatch] = useReducer(historyReducer,{history:[]});
    const token = localStorage.getItem("token");
    const auth = {
        headers:{
            authorization:token
        }
    };
    const addToHistory=async (video)=>{
        try{
            
            const response = await axios.post('/api/user/history',{video},auth);
            if(response.status===201){
                historyDispatch({type:"ADD",payload:response.data.history});
            }
        }catch(error){
            console.log(error);
        }
    }
    const deleteHistory=async (id)=>{
        try{
            const response = await axios.delete(`/api/user/history/${id}`,auth);
            
            if(response.status===200){
                historyDispatch({type:"DELETE",payload:response.data.history});
            }
        }catch(error){
            console.log(error);
        }
    }

    const clearAllHistory=async ()=>{
        try{
            const response = await axios.delete('/api/user/history/all',auth);
            if(response.status === 200){
                historyDispatch({type:"CLEAR",payload:response.data.history});
            }
        }catch(error){
            console.log(error);
        }
    }
    return {historyState ,addToHistory,deleteHistory,clearAllHistory,historyDispatch};
}

const useHistory =()=> useContext(HistoryContext);

export {useHistory,HistoryProvider};