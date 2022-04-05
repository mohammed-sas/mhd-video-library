import React from 'react'
import { useNotes } from '../../../../context'
import {NotesCard} from '../index';
import classes from './notesList.module.css';
const NotesList = ({videoId}) => {
    const {notesState} = useNotes();
    const videoNotes = notesState.notes.filter(note=>note.videoId === videoId);
    return (
        <div className={classes["notes-list"]}>
            <h2 className="text-primary">Notes</h2>
            {
                videoNotes.map(note=>{
                    return <NotesCard key={note._id} note={note}/>
                })
            }
        </div>
    )
}

export default NotesList
