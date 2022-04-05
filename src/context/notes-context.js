import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import {notesReducer} from '../reducer/notesReducer';

const NotesContext = createContext(null);

const NotesProvider=({children})=>{
    const value = useNotesActions();
    return(
        <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
    )
}

const useNotesActions=()=>{
    const [notesState,notesDispatch] = useReducer(notesReducer,{notes:[]});
    const token=localStorage.getItem("token");
    const auth={
        headers:{
            authorization:token
        }
    }
    const addNotes=async (videoId,newNote)=>{
        try{
            const response = await axios.post(`/api/user/notes/${videoId}`,{newNote},auth);
            if(response.status === 201){
                notesDispatch({type:"ADD",payload:response.data.notes});
            }
        }catch(error){
            console.log(error);
        }
    }

    return {notesState,addNotes};
}

const useNotes=()=>useContext(NotesContext);

export {NotesProvider,useNotes};