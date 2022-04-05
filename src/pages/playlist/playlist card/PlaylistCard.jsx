import classes from "./playlistCard.module.css";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { usePlaylist } from "../../../context/playlist-context";
import {InfoAlert,SuccessAlert} from '../../../components'

const PlaylistCard = ({ list }) => {
  const navigate = useNavigate();
  const [alertMessage,setAlertMessage] = useState("");
  const [apiCalled,setApiCalled] = useState(false);
  const [processing,setProcessing]=useState(false);
  const { removePlaylist } = usePlaylist();
  const closeHandler = async (e) => {
    try {
      e.stopPropagation();
      setApiCalled(true);
      setProcessing(true);
      setAlertMessage("playlist being deleted");
      await removePlaylist(list._id);
      setProcessing(false);
      setAlertMessage("playlist deleted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={classes["playlist-card"]}
      onClick={() => navigate(`/playlists/${list._id}`)}
    >
      <i
        className={`fas fa-times ${classes["close-btn"]}`}
        onClick={closeHandler}
      ></i>
      <span>{list.title}</span>
      
      {(apiCalled && !processing) ? <SuccessAlert message={alertMessage}/> : null}
      {(apiCalled&& processing) ? <InfoAlert message={alertMessage}/> :null}
    </div>
  );
};

export default PlaylistCard;
