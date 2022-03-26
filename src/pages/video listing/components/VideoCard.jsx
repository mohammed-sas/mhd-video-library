import classes from "./videoCard.module.css";
import { useToggle } from "../../../hooks/useToggle";
const VideoCard = ({ video,setShowModal,setPlaylistVideo }) => {
  const [showMenu, setShowMenu] = useToggle(false);
  const playListHandler=()=>{
    setShowModal();
    setShowMenu();
    setPlaylistVideo(video);
  }
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
              <li className={classes["control-item"]} onClick={playListHandler}>
                <i className="fas fa-plus text-white"></i> <span className="text-white">Add to playlist</span>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
