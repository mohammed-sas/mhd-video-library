import classes from "./singleVideo.module.css";
import { SideNavbar, ActionsModal } from "../../components";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToggle } from "../../hooks/useToggle";
import { useLike, useAuth } from "../../context";
const SingleVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const { addToLikes, deleteFromLikes, likeState } = useLike();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useToggle(false);
  const [showModal, setShowModal] = useToggle(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
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

    const isLiked = async () => {
      const isExist = likeState.likes.find(
        (likedVideo) => likedVideo._id === videoId
      );
      isExist ? setLiked() : null;
    };
    isLiked();
  }, []);

  const likehandler = async () => {
    try {
      if (!currentUser) {
        navigate("/login");
      }
      setLiked();
      if (!liked) {
        await addToLikes(video);
      } else {
        await deleteFromLikes(video._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const playlistHandler = async () => {
    try {
      if (!currentUser) {
        navigate("/login");
      }
      setShowModal();
    } catch (error) {
      console.log(error);
    }
  };
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
              <i
                className={
                  "text-white far fa-thumbs-up " + (liked ? "text-primary" : "")
                }
                onClick={likehandler}
              ></i>
              <i
                className="text-white fas fa-folder-plus"
                onClick={playlistHandler}
              ></i>
              <i className="text-white fas fa-bookmark"></i>
            </div>
            <div className={classes["channel-details"]}>
                <img src={video.channelThumbnail} alt={video.channelTitle} />
                <h3 className="text-white">{video.channelTitle}</h3>
            </div>
          </div>
          <div className={classes["video-typography"]}>
              <h2 className="text-primary">{video.title}</h2>
              <p className="text-white">{video.description}</p>
          </div>
          {showModal ? (
            <ActionsModal setShowModal={setShowModal} playlistVideo={video} />
          ) : null}
        </div>
      ) : (
        <h2 className="text-white">Loading...</h2>
      )}
    </main>
  );
};

export default SingleVideo;
