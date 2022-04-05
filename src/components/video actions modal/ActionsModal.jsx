import classes from "./actionsModal.module.css";
import { useState } from "react";
import { usePlaylist } from "../../context/playlist-context";
import { InfoAlert, SuccessAlert } from "../index";

const ActionsModal = ({ playlistVideo, setShowModal }) => {
  const [newPlayList, setNewPlayList] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [apiCalled, setApiCalled] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { playlistState, addNewPlaylist, addToPlaylist, removeFromPlaylist } =
    usePlaylist();

  const addPlaylistHandler = async () => {
    try {
      if (newPlayList.trim() === "") {
        return;
      }
      let isExist = playlistState.playlists.find(
        (list) => list.title.toLowerCase() === newPlayList.trim().toLowerCase()
      );
      if (isExist) {
        return;
      }
      setApiCalled(true);
      setProcessing(true);
      setAlertMessage("creating playlist");
      await addNewPlaylist({ title: newPlayList.trim(), description: "" });
      setProcessing(false);
      setAlertMessage("playlist created");
    } catch (error) {
      console.log(error);
    }
  };
  const changeHandler = async (e, id) => {
    try {
      if (e.target.checked) {
        setApiCalled(true);
        setProcessing(true);
        setAlertMessage("Adding to playlist");
        await addToPlaylist(id, playlistVideo);
        setProcessing(false);
        setAlertMessage("Added to your playlist");
      } else {
        setApiCalled(true);
        setProcessing(true);
        setAlertMessage("Removing from the playlist");
        await removeFromPlaylist(id, playlistVideo);
        setProcessing(false);
        setAlertMessage("Removed from the playlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isPresentInPlaylist = (id) => {
    let res = playlistState.playlists
      .filter((list) => list._id === id)[0]
      .videos.filter((video) => video._id == playlistVideo._id);
    return res.length > 0 ? true : false;
  };
  return (
    <div className={classes["modal-container"]}>
      <div className={classes["modal"]}>
        <h2 className="text-white">Playlists</h2>
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
        <ul className={classes["playlists"]}>
          {playlistState.playlists.map((list) => {
            return (
              <li key={list._id}>
                <label
                  htmlFor="playlist"
                  className="text-white"
                  className={classes["playlist-item"]}
                >
                  <input
                    type="checkbox"
                    checked={isPresentInPlaylist(list._id)}
                    onChange={(e) => changeHandler(e, list._id)}
                  />{" "}
                  <span>{list.title}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      {apiCalled && !processing ? (
        <SuccessAlert message={alertMessage} />
      ) : null}
      {(apiCalled && processing) ? <InfoAlert message={alertMessage} />:null}
    </div>
  );
};

export default ActionsModal;
