
import { useAuth, useNotes } from "../../../../context";
import { NotesCard, NotesModal } from "../index";
import { useToggle } from "../../../../hooks/useToggle";
import classes from "./notesList.module.css";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
type Prop={
  videoId:string,
  playerRef:React.RefObject<ReactPlayer>,
  setPlaying:()=>void
}

const NotesList = ({ videoId, playerRef,setPlaying }:Prop):JSX.Element=> {
  const notesCtx= useNotes();
  const authCtx= useAuth();
  const navigate = useNavigate();
  const [showNotesForm, setShowNotesForm] = useToggle(false);
  const videoNotes =  notesCtx?.notesState.notes.filter(
    (note) => note.videoId === videoId
  );
  const addNoteHandler=()=>{

    if(!authCtx?.currentUserState.user){
      navigate("/login");
      return;
    }
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
        {videoNotes?.map((note) => {
          return <NotesCard key={note._id} note={note} setPlaying={setPlaying}/>;
        })}
      </div>
    </div>
  );
};

export default NotesList;
