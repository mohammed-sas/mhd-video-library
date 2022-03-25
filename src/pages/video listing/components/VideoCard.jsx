import classes from "./videoCard.module.css";

const VideoCard = ({ video }) => {
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
            <p className={`text-white ${classes["channel-title"]}`}>{video.channelTitle}</p>
            <small className={`text-white ${classes["video-category"]}`}>{video.category}</small>
        </div>
        <i className={`fas fa-ellipsis-v text-white ${classes["video-controls"]}`}></i>
      </div>
    </div>
  );
};

export default VideoCard;
