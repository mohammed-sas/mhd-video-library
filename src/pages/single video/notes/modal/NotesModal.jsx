import classes from "./notesModal.module.css";
import { convertTime } from "../../../../utils/convertTime";
import { useState } from "react";
import { useNotes } from "../../../../context";
const NotesModal = ({ videoId, player, setShowNotesForm,setPlaying }) => {
  const { addNotes } = useNotes();
  const [newNote, setNewNote] = useState({
    time: convertTime(player.current.getCurrentTime()),
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      await addNotes(videoId, newNote);
      setShowNotesForm();
      setPlaying();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["notes-modal"]}>
      <form
        action="post"
        className={classes["notes-form"]}
        onSubmit={submitHandler}
      >
        <i
          onClick={setShowNotesForm}
          className={`fas fa-times text-white ${classes["close-btn"]}`}
        ></i>
        <h3 className="text-white">Add new note</h3>
        <label htmlFor="title">
          Title <br />
          <input
            name="title"
            type="text"
            onChange={changeHandler}
            placeholder="Title"
          />
        </label>
        <label htmlFor="description">
          <textarea
            name="description"
            onChange={changeHandler}
            placeholder="Description"
            className={classes["textarea"]}
          ></textarea>
        </label>
        <input
          type="submit"
          value="Add note"
          className="btn btn-primary bg-primary text-grey"
        />
      </form>
    </div>
  );
};

export default NotesModal;
