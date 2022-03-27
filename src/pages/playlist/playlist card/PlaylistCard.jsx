import { useNavigate } from "react-router-dom";
import { usePlaylist } from "../../../context/playlist-context";
import classes from "./playlistCard.module.css";

const PlaylistCard = ({ list }) => {
  const navigate = useNavigate();
  const { removePlaylist } = usePlaylist();
  const closeHandler = async (e) => {
    try {
      e.stopPropagation();
      await removePlaylist(list._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={classes["playlist-card"]}
      onClick={() => navigate(`/playlists/${list._id}`)}
    >
      {list.title}
      <i
        className={`fas fa-times ${classes["close-btn"]}`}
        onClick={closeHandler}
      ></i>
    </div>
  );
};

export default PlaylistCard;
