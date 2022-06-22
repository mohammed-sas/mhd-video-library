import axios from "axios";
import { createContext, useContext,useEffect,useState } from "react";
import {Prop} from '../context types/common.types';
import {VideoListsContext,VideoListState} from '../context types/video.types';
const VideoContext = createContext<VideoListsContext|null>(null);

const VideoProvider=({children}:Prop)=>{
    const value = useVideoActions();
    return(
        <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
    )
}


const useVideoActions=()=>{
    const [videoLists,setVideoLists] = useState<VideoListState>({videos:[]});

   
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