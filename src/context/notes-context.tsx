import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import {notesReducer} from '../reducer/notesReducer';
import {Prop} from "../context types/common.types";
import {ContextInterface, NoteData, Notes} from '../context types/notes.types';
const NotesContext = createContext<ContextInterface|null>(null);

const NotesProvider=({children}:Prop)=>{
    const value = useNotesActions();
    return(
        <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
    )
}
const initialState={
    notes:[]
}

const useNotesActions=()=>{
    const [notesState,notesDispatch] = useReducer(notesReducer,initialState);
    const token=localStorage.getItem("token");
    const auth={
        headers:{
            authorization:token
        }
    }
    const addNotes=async (videoId:string,newNote:NoteData)=>{
        try{
            const response = await axios.post(`/api/user/notes/${videoId}`,{newNote},auth);
            if(response.status === 201){
                notesDispatch({type:"ADD",payload:response.data.notes});
            }
        }catch(error){
            console.log(error);
        }
    }
    const deleteNote=async (note:Notes)=>{
        try{
            const response= await axios.delete(`/api/user/note/${note._id}`,auth);
            if(response.status === 200){
                notesDispatch({type:"UPDATE",payload:response.data.notes});
            }
        }catch(error){
            console.log(error);
        }
    }
    const updateNote=async (note:Notes)=>{
        try{
            const response = await axios.post(`/api/user/note/${note._id}`,{note},auth);
            if(response.status === 200){
                notesDispatch({type:"UPDATE",payload:response.data.notes});
            }
        }catch(error){
            console.log(error);
        }
    }

    return {notesState,addNotes,deleteNote,updateNote,notesDispatch};
}

const useNotes=()=>useContext(NotesContext);

export {NotesProvider,useNotes};