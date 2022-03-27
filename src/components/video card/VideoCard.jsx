import classes from "./videoCard.module.css";
import { useToggle } from "../../hooks/useToggle";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { usePlaylist } from "../../context/playlist-context";
import { useLike } from "../../context/like-context";
const VideoCard = ({ video, setShowModal, setPlaylistVideo, playlistId }) => {
  const [showMenu, setShowMenu] = useToggle(false);
  const { removeFromPlaylist } = usePlaylist();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { addToLikes, likeState, deleteFromLikes } = useLike();
  const playListHandler = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setShowModal();
    setShowMenu();
    setPlaylistVideo(video);
  };

  const isPlaylisted = () => {
    const result = location.pathname.match("playlist");
    return result;
  };
  const removeFromPlayListHandler = async () => {
    try {
      await removeFromPlaylist(playlistId, video);
    } catch (error) {
      console.log(error);
    }
  };
  const addToLikeHandler = async () => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      await addToLikes(video);
    } catch (error) {
      console.log(error);
    }
  };
  const isLiked = (id) => {
    const result = likeState.likes.find((likedVideo) => likedVideo._id === id);
    return result ? true : false;
  };
  const removeLikeHandler = async () => {
    try {
      await deleteFromLikes(video._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes["video-card"]}>
      <div className={classes["video-thumbnail"]}>
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
              {!isPlaylisted() && (
                <li
                  className={classes["control-item"]}
                  onClick={playListHandler}
                >
                  <i className="fas fa-plus text-white"></i>{" "}
                  <span className="text-white">Add to playlist</span>
                </li>
              )}
              {isPlaylisted() && (
                <li
                  className={classes["control-item"]}
                  onClick={removeFromPlayListHandler}
                >
                  <i className="fas fa-plus text-white"></i>{" "}
                  <span className="text-white">Remove from playlist</span>
                </li>
              )}
              {!isLiked(video._id) && (
                <li
                  className={classes["control-item"]}
                  onClick={addToLikeHandler}
                >
                  <i className="far fa-thumbs-up text-white"></i>
                  <span className="text-white">Like Video</span>
                </li>
              )}
              {isLiked(video._id) && (
                <li
                  className={classes["control-item"]}
                  onClick={removeLikeHandler}
                >
                  <i className="fas fa-thumbs-down text-white"></i>
                  <span className="text-white">Unlike Video</span>
                </li>
              )}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
