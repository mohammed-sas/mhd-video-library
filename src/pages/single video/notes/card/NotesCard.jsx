import classes from './noteCard.module.css'
import { useNotes } from '../../../../context'
import {useToggle} from '../../../../hooks/useToggle';
import EditNotesModal from '../modal/EditNotesModal';


const NotesCard = ({note}) => {
    const {deleteNote} = useNotes();
    const [showEditForm,setShowEditForm] = useToggle(false);

    const deleteHandler=async ()=>{
        try{
            await deleteNote(note);
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className={classes["note-card"]}>
            <div className={classes["card-body"]}>
                <h3 className="text-white">{note.title}</h3>
                <span className="text-white"><i className="far fa-clock text-primary"></i> {note.time}</span>
                <p className="text-white">{note.description}</p>
            </div>
            <div className={classes["card-footer"]}>
                <button className="btn btn-primary bg-primary text-grey" onClick={setShowEditForm}>Edit</button>
                <button className="btn btn-primary bg-red" onClick={deleteHandler}>Delete</button>
            </div>
            {showEditForm ? <EditNotesModal note={note} setShowEditForm={setShowEditForm}/> : null}
        </div>
    )
}

export default NotesCard
