import classes from './noteCard.module.css'

const NotesCard = ({note}) => {
    return (
        <div className={classes["note-card"]}>
            <div>
                <h3 className="text-white">{note.title}</h3>
                <span className="text-white"><i class="far fa-clock text-primary"></i>{note.time}</span>
                <p className="text-white">{note.description}</p>
            </div>
            <div>
                <button className="btn btn-primary bg-primary text-grey">Edit</button>
                <button className="btn btn-primary bg-red">Delete</button>
            </div>
        </div>
    )
}

export default NotesCard
