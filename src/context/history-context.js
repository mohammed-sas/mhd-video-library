import axios from "axios";

const { createContext, useContext, useState } = require("react");

const HistoryContext = createContext(null);

const HistoryProvider =({children}) =>{
    const value = useHistoryActions();
    return (
        <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
    )
}

const useHistoryActions=()=>{
    const [historyState,setHistoryState] = useState({history:[]});
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
                setHistoryState({
                    ...historyState,
                    history: response.data.history

                })
            }
        }catch(error){
            console.log(error);
        }
    }
    return {historyState ,addToHistory};
}

const useHistory =()=> useContext(HistoryContext);

export {useHistory,HistoryProvider};