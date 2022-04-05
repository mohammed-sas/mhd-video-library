import classes from './notesModal.module.css'
import {convertTime} from '../../../../utils/convertTime'
const NotesModal = ({player,setShowNotesForm}) => {
    console.log(convertTime(player.current.getCurrentTime()));
  return (
    <div className={classes["notes-modal"]}>
      <form action="post" className={classes["notes-form"]}>
      <i
          onClick={setShowNotesForm}
          className={`fas fa-times text-white ${classes["close-btn"]}`}
        ></i>
        <h3 className="text-white">Add new note</h3>
        <label htmlFor="title">
          Title <br />
          <input name="title" type="text" placeholder="Title" />
        </label>
        <label htmlFor="description">
            <textarea name="description" placeholder="Description" className={classes["textarea"]}></textarea>
        </label>
        <input type="submit" value="Add note" className="btn btn-primary bg-primary text-grey"/>
      </form>
    </div>
  );
};

export default NotesModal;
