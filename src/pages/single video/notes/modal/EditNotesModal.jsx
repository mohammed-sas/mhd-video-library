import {useState} from "react";
import { useNotes } from "../../../../context";
import classes from './notesModal.module.css';
const EditNotesModal = ({note,setShowEditForm}) => {
    const {updateNote} = useNotes();
    const [editedNote,setEditedNote]=useState({
      ...note
    })


    const changeHandler=(e)=>{
        const {name,value}=e.target;
        setEditedNote({
            ...editedNote,
            [name]:value
        })
    }
    const submitHandler=async (e)=>{
        try{
            e.preventDefault();
            await updateNote(editedNote);
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className={classes["notes-modal"]}>
      <form
        action="post"
        className={classes["notes-form"]}
        onSubmit={submitHandler}
      >
        <i
          onClick={setShowEditForm}
          className={`fas fa-times text-white ${classes["close-btn"]}`}
        ></i>
        <h3 className="text-white">Edit note</h3>
        <label htmlFor="title">
          Title <br />
          <input
            name="title"
            type="text"
            defaultValue={note.title}
            onChange={changeHandler}
            placeholder="Title"
          />
        </label>
        <label htmlFor="description">
          <textarea
            name="description"
            onChange={changeHandler}
            defaultValue={note.description}
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

export default EditNotesModal;
