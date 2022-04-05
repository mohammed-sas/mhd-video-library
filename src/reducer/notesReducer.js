const notesReducer=(state,{type,payload})=>{
    switch(type){
        case "ADD":
            return{
                ...state,
                notes:payload
            }
        default:
            return state;
    }
}

export {notesReducer};