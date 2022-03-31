import axios from "axios";
import { createContext, useContext,useEffect,useState } from "react";

const VideoContext = createContext(null);

const VideoProvider=({children})=>{
    const value = useVideoActions();
    return(
        <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
    )
}


const useVideoActions=()=>{
    const [videoLists,setVideoLists] = useState({videos:[]});

   
    useEffect(()=>{
        const getVideos=async ()=>{
            try{
                const response = await axios.get('/api/videos');
                if(response.status === 200){
                    setVideoLists({
                        ...videoLists,
                        videos:response.data.videos
                    })
                }
            }catch(error){
                console.log(error);
            }
        }
        getVideos();
    },[])

    return {videoLists};
}

const useVideo=()=>useContext(VideoContext);

export {useVideo,VideoProvider};