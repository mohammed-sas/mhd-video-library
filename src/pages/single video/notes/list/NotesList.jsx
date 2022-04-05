import React from "react";
import { useNotes } from "../../../../context";
import { NotesCard, NotesModal } from "../index";
import { useToggle } from "../../../../hooks/useToggle";
import classes from "./notesList.module.css";
const NotesList = ({ videoId, playerRef,setPlaying }) => {
  const { notesState } = useNotes();
  const [showNotesForm, setShowNotesForm] = useToggle(false);
  const videoNotes = notesState.notes.filter(
    (note) => note.videoId === videoId
  );
  const addNoteHandler=()=>{
    setShowNotesForm();
    setPlaying();
  }
  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <h2 className="text-primary">Notes</h2>
        <button
          className="btn btn-primary bg-primary text-grey"
          onClick={addNoteHandler}
        >
          Add notes
        </button>
      </div>
      {showNotesForm ? (
        <NotesModal
          player={playerRef}
          videoId={videoId}
          setShowNotesForm={setShowNotesForm}
          setPlaying={setPlaying}
        />
      ) : null}

      <div className={classes["notes-list"]}>
        {videoNotes.map((note) => {
          return <NotesCard key={note._id} note={note} setPlaying={setPlaying}/>;
        })}
      </div>
    </div>
  );
};

export default NotesList;
