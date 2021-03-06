import classes from "./videoCard.module.css";
import { useToggle } from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import {
  useAuth,
  useLike,
  usePlaylist,
  useWatchLater,
} from "../../context/index";
import {SuccessAlert,InfoAlert} from '../index';
import { useState } from "react";
import {Video} from '../../context types/common.types'

type VideoCardProp={
  video:Video,
  setShowModal?:()=>void,
  playlistId?:string,
  setPlaylistVideo?:(video:Video)=>void
}

const VideoCard = ({ video, setShowModal, setPlaylistVideo, playlistId }:VideoCardProp):JSX.Element => {
  const [showMenu, setShowMenu] = useToggle(false);
  const playlistContext = usePlaylist();
  const authContext= useAuth();
  const navigate = useNavigate();
  const likeContext=useLike();
  const [alertMessage,setAlertMessage] = useState<string>("");
  const [apiCalled,setApiCalled] = useState<boolean>(false);
  const [processing,setProcessing]=useState<boolean>(false);
   const watchLaterCtx= useWatchLater();
  const playListHandler = () => {
    if (!authContext?.currentUserState.user) {
      navigate("/login");
      return;
    }
    if(setShowModal) setShowModal();
    setShowMenu();
    if(setPlaylistVideo)setPlaylistVideo(video);
  };

  const isPlaylisted = () => {
    const result = location.pathname.match("playlist");
    return result;
  };
  const removeFromPlayListHandler = async () => {
    try {
      await playlistContext?.removeFromPlaylist(playlistId?playlistId :"", video);
    } catch (error) {
      console.log(error);
    }
  };
  const addToLikeHandler = async () => {
    try {
      if (!authContext?.currentUserState.user) {
        navigate("/login");
        return;
      }
      setApiCalled(true);
      setProcessing(true);
      setAlertMessage("Adding to your liked list");
      await likeContext?.addToLikes(video);
      setProcessing(false);
      setAlertMessage("Added to your liked list");
      
    } catch (error) {
      console.log(error);
    }
  };
  const isLiked = (id:string) => {
    const result = likeContext?.likeState.likes.find((likedVideo) => likedVideo._id === id);
    return result ? true : false;
  };
  const removeLikeHandler = async () => {
    try {
      setApiCalled(true);
      setProcessing(true);
      setAlertMessage("removing from liked list");
      await likeContext?.deleteFromLikes(video._id);
      setProcessing(false);
      setAlertMessage("removed from liked list")
    } catch (error) {
      console.log(error);
    }
  };
  const singleVideoHandler = () => {
    navigate(`/explore/${video._id}`);
  };
  const addWatchLaterHandler = async () => {
    try {
      setApiCalled(true);
      setProcessing(true);
      setAlertMessage("adding to watch later");
      await watchLaterCtx?.addToWatchLater(video);
      setProcessing(false);
      setAlertMessage("added to watch later");
    } catch (error) {
      console.log(error);
    }
  };
  const removeWatchLaterHandler = async () => {
    try {
      setApiCalled(true);
      setProcessing(true);
      setAlertMessage("removing from watch later");
      await watchLaterCtx?.deleteFromWatchLater(video._id);
      setProcessing(false);
      setAlertMessage("removed from watch later");
    } catch (error) {
      console.log(error);
    }
  };
  const isSaved = (id:string) => {
    const isExist = watchLaterCtx?.watchLaterState.watchLater.some(
      (savedVideo) => savedVideo._id === id
    );

    return isExist;
  };
  return (
    <div className={classes["video-card"]}>
      <div className={classes["video-thumbnail"]} onClick={singleVideoHandler}>
        <img src={video.videoThumbnail} alt={video.title} />
      </div>
      <div className={classes["video-details"]}>
        <img
          className={classes["channel-img"]}
          src={video.channelThumbnail}
          alt={video.channelTitle}
        />
        <div className={classes["video-card-typography"]}>
          <p className="text-white">{video.title}</p>
          <p className={`text-white ${classes["channel-title"]}`}>
            {video.channelTitle}
          </p>
          <small className={`text-white ${classes["video-category"]}`}>
            {video.category}
          </small>
        </div>
        <div className={classes["controls-container"]}>
          <i
            className={`fas fa-ellipsis-v text-white ${classes["video-controls"]}`}
            onClick={setShowMenu}
          ></i>
          {showMenu ? (
            <ul className={classes["controls"]}>
              {isPlaylisted() ? (
                <li
                  className={classes["control-item"]}
                  onClick={removeFromPlayListHandler}
                >
                  <i className="fas fa-plus text-white"></i>{" "}
                  <span className="text-white">Remove from playlist</span>
                </li>
              ) : (
                <li
                  className={classes["control-item"]}
                  onClick={playListHandler}
                >
                  <i className="fas fa-plus text-white"></i>{" "}
                  <span className="text-white">Add to playlist</span>
                </li>
              )}

              {isLiked(video._id) ? (
                <li
                  className={classes["control-item"]}
                  onClick={removeLikeHandler}
                >
                  <i className="fas fa-thumbs-down text-white"></i>
                  <span className="text-white">Unlike Video</span>
                </li>
              ) : (
                <li
                  className={classes["control-item"]}
                  onClick={addToLikeHandler}
                >
                  <i className="far fa-thumbs-up text-white"></i>
                  <span className="text-white">Like Video</span>
                </li>
              )}
              {!isSaved(video._id) ? (
                <li
                  className={classes["control-item"]}
                  onClick={addWatchLaterHandler}
                >
                  <i className="far fa-bookmark text-white"></i>
                  <span className="text-white">Watch later</span>
                </li>
              ) : (
                <li
                  className={classes["control-item"]}
                  onClick={removeWatchLaterHandler}
                >
                  <i className="fas fa-bookmark text-white"></i>
                  <span className="text-white">Watch later</span>
                </li>
              )}
            </ul>
          ) : null}
        </div>
      </div>
      {(apiCalled && !processing) ? <SuccessAlert message={alertMessage}/> : null}
      {(apiCalled&&processing) ? <InfoAlert message={alertMessage}/> :null}
    </div>
  );
};

export default VideoCard;
