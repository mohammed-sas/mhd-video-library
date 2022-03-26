
const playlistReducer=(state,{type,payload})=>{

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
    }
}


export {playlistReducer}