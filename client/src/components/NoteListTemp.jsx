import { useEffect, useState } from "react";
import NoteDetailsTemp from "./NoteDetailsTemp";
import _ from "underscore";

// // Sample Notes
// const notes = [
//     {id: 1, content: 'This is note 1.'},
//     {id: 2, content: 'This is note 2.'}
// ];

function NoteListTemp() {
    const [selectedNote, setSelectedNote] = useState({});
    const [notes, setNotes] = useState([]);


    ///////////////
    useEffect(() => {
        // Fetch notes from the server
        async function fetchNotes(event) {
            event.preventDefault(); // Prevent the default form submission behavior
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
            {!_.isEmpty(selectedNote) ? <NoteDetailsTemp note={selectedNote} /> : <></>}
        </div>
    );
}

export default NoteListTemp;