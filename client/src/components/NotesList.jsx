import { useEffect, useState } from "react";
import NoteDetails from "./NoteDetails";
import _ from "underscore";

// // Sample Notes
// const notes = [
//     {id: 1, content: 'This is note 1.'},
//     {id: 2, content: 'This is note 2.'}
// ];

function NotesList() {
    const [selectedNote, setSelectedNote] = useState({});
    const [notes, setNotes] = useState([]);


    ///////////////
    useEffect(() => {
        // Fetch notes from the server
        async function fetchNotes() {
            try {
                const response = await fetch("http://localhost:9000/notes/");
                const data = await response.json();
                console.log("Response data = ", JSON.stringify(data));
                setNotes(data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        }

        fetchNotes();
    }, []); // Run this effect only once when the component mounts

    ////////////////
    function showNoteDetails(note){
        setSelectedNote(note);
    };
    
    return (
        <div>
            <h2>Your Notes</h2>
            <ul>
              {notes.map((note) => (
                <li key={note._id} onClick={(note) => {showNoteDetails(note)}}>
                    {note.content}
                </li>
              ))}
            </ul>
            {!_.isEmpty(selectedNote) ? <NoteDetails note={selectedNote} /> : <></>}
        </div>
    );
}

export default NotesList;