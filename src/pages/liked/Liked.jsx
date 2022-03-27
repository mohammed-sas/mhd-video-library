import classes from './liked.module.css'
import SideNavbar from '../../components/side navbar/SideNavbar';
import {useLike} from '../../context/like-context'
import VideoCard from '../../components/video card/VideoCard'
const Liked = () => {
    const {likeState} = useLike();
    return (
        <main className={classes["likes-page"]}>
           <SideNavbar/>
           <div className={classes["liked-video-container"]}>
            {
                likeState.likes.map(video=>{
                    return(
                        <VideoCard video={video}/>
                    )
                })
            }
           </div>
        </main>
    )
}

export default Liked
