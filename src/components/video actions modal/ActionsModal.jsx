import { useState } from "react";
import { usePlaylist } from "../../context/playlist-context";
import classes from "./actionsModal.module.css";

const ActionsModal = ({playlistVideo, setShowModal }) => {
  const [newPlayList, setNewPlayList] = useState("");
  const { playlistState, addNewPlaylist,addToPlaylist,removeFromPlaylist } = usePlaylist();

  const addPlaylistHandler = async () => {
    try {
      await addNewPlaylist({ title: newPlayList, description: "" });
    } catch (error) {
      console.log(error);
    }
  };
  const changeHandler=async (e,id)=>{
    try{
        if(e.target.checked){
            await addToPlaylist(id,playlistVideo); 
        }else{
            await removeFromPlaylist(id,playlistVideo);
        }
    }catch(error){
        console.log(error);
    }
  }
  return (
    <div className={classes["modal-container"]}>
      <div className={classes["modal"]}>
        <i
          onClick={setShowModal}
          className={`fas fa-times text-white ${classes["close-btn"]}`}
        ></i>
        <input type="text" onChange={(e) => setNewPlayList(e.target.value)} />
        <button
          className="btn btn-primary bg-primary text-grey"
          onClick={addPlaylistHandler}
        >
          Create Playlist
        </button>
        <ul>
          {playlistState.playlists.map((list) => {
            return (
              <li key={list._id}>
                <label htmlFor="playlist" className="text-white">
                    <input type="checkbox" onChange={(e)=>changeHandler(e,list._id)} /> {list.title}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ActionsModal;
