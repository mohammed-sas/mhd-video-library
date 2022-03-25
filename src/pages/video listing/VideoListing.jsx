import classes from './videoListing.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from './components/VideoCard';
import SideNavbar from '../../components/side navbar/SideNavbar';
const VideoListing = () => {
    const [lists,setLists] = useState([]);
    useEffect(()=>{
        const fetchVideos=async ()=>{
            try{
                const response = await axios.get('/api/videos');
                if(response.status===200)
                setLists(response.data.videos);
            }catch(error){
                console.log(error);
            }
        }

        fetchVideos();
    },[])
    return (
        <main className={classes["listing-container"]}>
            <SideNavbar/>
            <div className={classes["lists"]}>
                <div className="filters"></div>
                <div className={classes["video-cards"]}>
                    {
                        lists.map(video=>{
                            return <VideoCard key={video._id} video={video}/>
                        })
                    }
                </div>
            </div>
        </main>
    )
}

export default VideoListing
