import {NotesState,NotesActions} from '../context types/notes.types'
const notesReducer=(state:NotesState,actions:NotesActions):NotesState=>{
    switch(actions.type){
        case "ADD":
            return{
                ...state,
                notes:actions.payload
            }
        case "UPDATE":
            return{
                ...state,
                notes:actions.payload
            }
        default:
            return state;
    }
}

export {notesReducer};