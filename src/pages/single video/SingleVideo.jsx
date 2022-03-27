import classes from "./singleVideo.module.css";
import SideNavbar from "../../components/side navbar/SideNavbar";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToggle } from "../../hooks/useToggle";
import {useLike} from '../../context'
const SingleVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const {addToLikes,deleteFromLikes,likeState} = useLike();
  const [loading, setLoading] = useState(true);
  const [liked,setLiked] = useToggle(false);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/videos");
        setLoading(false);
        if (response.status === 200) {
          const result = response.data.videos.find(
            (video) => video._id === videoId
          );
          setVideo(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();

    const isLiked =async ()=>{
        const isExist = likeState.likes.find(likedVideo=> likedVideo._id === videoId);
        isExist ? setLiked() : null;
    }
    isLiked();
  }, []);

  const likehandler=async ()=>{
    try{
        setLiked();
        if(!liked){
            await addToLikes(video);
        }else{
            await deleteFromLikes(video._id);
        }
    }catch(error){
        console.log(error);
    }
  }
  const playlistHandler=()=>{}
  return (
    <main className={classes["single-video-container"]}>
      <SideNavbar />
      {!loading ? (
        <div className={classes["video-container"]}>
          <div className={classes["player-wrapper"]}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
          <div className={classes["video-body"]}>
            <div className={classes["video-controls"]}>
              <i className={"text-white far fa-thumbs-up "+(liked ? "text-primary":"")} onClick={likehandler}></i>
              <i className="text-white fas fa-folder-plus" onClick={playlistHandler}></i>
              <i className="text-white fas fa-bookmark"></i>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-white">Loading...</h2>
      )}
    </main>
  );
};

export default SingleVideo;
