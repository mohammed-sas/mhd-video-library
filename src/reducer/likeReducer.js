const likeReducer=(state,{type,payload})=>{
    switch(type){
        case "ADD":
            return {
                ...state,
                likes:payload
            }
        case "DELETE":
            return{
                ...state,
                likes:payload
            }
        default:
            return state;
    }
}

export {likeReducer};