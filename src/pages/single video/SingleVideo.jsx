import classes from "./singleVideo.module.css";
import { SideNavbar, ActionsModal } from "../../components";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToggle } from "../../hooks/useToggle";
import { useLike, useAuth, useHistory, useWatchLater } from "../../context";
import {InfoAlert,SuccessAlert} from '../../components'
const SingleVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const { addToLikes, deleteFromLikes, likeState } = useLike();
  const { addToWatchLater, deleteFromWatchLater, watchLaterState } =
    useWatchLater();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useToggle(false);
  const [saved, setSaved] = useToggle(false);
  const [showModal, setShowModal] = useToggle(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [apiCalled, setApiCalled] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { addToHistory } = useHistory();
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
          await addToHistory(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();

    const isLiked = () => {
      const isExist = likeState.likes.find(
        (likedVideo) => likedVideo._id === videoId
      );
      isExist ? setLiked() : null;
    };
    isLiked();
    const isSaved = () => {
      const isExist = watchLaterState.watchLater.find(
        (watchedVideo) => watchedVideo._id === videoId
      );
      isExist ? setSaved() : null;
    };
    isSaved();
  }, []);

  const likehandler = async () => {
    try {
      if (!currentUser.user) {
        navigate("/login");
      }
      setLiked();
      if (!liked) {
        setApiCalled(true);
        setProcessing(true);
        setAlertMessage("Adding to your liked list");
        await addToLikes(video);
        setProcessing(false);
        setAlertMessage("Added to your liked list");
      } else {
        setApiCalled(true);
        setProcessing(true);
        setAlertMessage("removing from liked list");
        await deleteFromLikes(video._id);
        setProcessing(false);
        setAlertMessage("removed from liked list");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const playlistHandler = async () => {
    try {
      if (!currentUser.user) {
        navigate("/login");
      }
      setShowModal();
    } catch (error) {
      console.log(error);
    }
  };
  const watchLaterHandler = async () => {
    try {
      if (!currentUser.user) {
        navigate("/login");
      }
      setSaved();
      if (!saved) {
        setApiCalled(true);
        setProcessing(true);
        setAlertMessage("adding to watch later");
        await addToWatchLater(video);
        setProcessing(false);
        setAlertMessage("added to watch later");
      } else {
        setApiCalled(true);
        setProcessing(true);
        setAlertMessage("removing from watch later");
        await deleteFromWatchLater(video._id);
        setProcessing(false);
        setAlertMessage("removed from watch later");
      }
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
              <i
                className={
                  "text-white fas fa-bookmark " + (saved ? "text-primary" : "")
                }
                onClick={watchLaterHandler}
              ></i>
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
      {apiCalled && !processing ? (
        <SuccessAlert message={alertMessage} />
      ) : null}
      {apiCalled && processing && <InfoAlert message={alertMessage} />}
    </main>
  );
};

export default SingleVideo;
