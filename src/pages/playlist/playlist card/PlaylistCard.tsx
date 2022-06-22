import classes from "./playlistCard.module.css";
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { usePlaylist } from "../../../context/playlist-context";
import {InfoAlert,SuccessAlert} from '../../../components'
import { Playlist } from "context types/playlist.types";

type PlaylistCardProp={
  list:Playlist
}
const PlaylistCard = ({ list }:PlaylistCardProp):JSX.Element => {
  const navigate = useNavigate();
  const [alertMessage,setAlertMessage] = useState<string>("");
  const [apiCalled,setApiCalled] = useState<boolean>(false);
  const [processing,setProcessing]=useState<boolean>(false);
  const playlistCtx=usePlaylist();
  const closeHandler = async (e:React.MouseEvent<HTMLElement>) => {
    try {
      e.stopPropagation();
      setApiCalled(true);
      setProcessing(true);
      setAlertMessage("playlist being deleted");
      await playlistCtx?.removePlaylist(list._id);
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
