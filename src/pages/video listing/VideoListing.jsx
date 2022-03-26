import classes from './videoListing.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../../components/video card/VideoCard'
import SideNavbar from '../../components/side navbar/SideNavbar';
import { useToggle } from '../../hooks/useToggle';
import ActionsModal from '../../components/video actions modal/ActionsModal';
const VideoListing = () => {
    const [lists,setLists] = useState([]);
    const [showModal,setShowModal] = useToggle(false);
    const [playlistVideo,setPlaylistVideo] = useState(null);
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
                            return <VideoCard key={video._id} setPlaylistVideo={setPlaylistVideo} video={video} setShowModal={setShowModal}/>
                        })
                    }
                </div>
            </div>
            {
                showModal ? <ActionsModal setPlaylistVideo={setPlaylistVideo} playlistVideo={playlistVideo} setShowModal={setShowModal}/> : null
            }
        </main>
    )
}

export default VideoListing
