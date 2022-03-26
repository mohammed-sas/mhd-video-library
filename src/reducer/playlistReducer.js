
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
    }
}


export {playlistReducer}