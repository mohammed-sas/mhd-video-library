import { Dispatch } from "react"

export type Notes={
    _id:string,
    description:string,
    time:string,
    title:string,
    videoId:string
}

export type NoteData={
    title:string,
    description:string
}

export type NotesState={
    notes:Notes[]
}

export type NotesActions=
|{
    type:"ADD",
    payload:Notes[]
}
|{
    type:"UPDATE",
    payload:Notes[]
}

export interface ContextInterface{
    notesState:NotesState,
    addNotes:(videoId:string,newNote:NoteData)=>{},
    deleteNote:(note:Notes)=>{},
    updateNote:(note:Notes)=>{},
    notesDispatch:Dispatch<NotesActions>
}