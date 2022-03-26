
const playlistReducer=(state,{type,payload})=>{
    console.log(type,payload);
    switch(type){
        case "FETCHING":
            return{
                ...state,
                loading:true
            };
        case "FETCHED":
            return{
                ...state,
                loading:false,
                playlists:payload
            }
        case "UPDATE":
            return{
                ...state,
                playlists:payload
            }
        case "ADD_TO_PLAYLIST":
            return{
                ...state,
                playlists:[payload,...state.playlists.filter(list=>list._id !== payload._id)]
            }
            case "REMOVE_FROM_PLAYLIST":
                return{
                    ...state,
                    playlists:[payload,...state.playlists.filter(list=>list._id !== payload._id)]
                }
        default:
            return state;
    }
}


export {playlistReducer}