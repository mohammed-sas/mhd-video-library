import { useNotes } from '../../../../context'
import classes from './noteCard.module.css'

const NotesCard = ({note}) => {
    const {deleteNote} = useNotes();

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
                <button className="btn btn-primary bg-primary text-grey">Edit</button>
                <button className="btn btn-primary bg-red" onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    )
}

export default NotesCard
