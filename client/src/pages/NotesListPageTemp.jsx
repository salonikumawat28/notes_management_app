import { useState } from "react";
import NoteCreateTemp from "../components/NoteCreateTemp";
import NotesListTemp from "../components/NoteListTemp";

function NotesListPageTemp() {
    const [showNotesListComponent, setShowNotesListComponent] = useState(false);

    function showNotesList() {
        setShowNotesListComponent(!showNotesListComponent);
    }

    return (
        <div>
           <button type="submit" onClick={showNotesList}>Notes</button>
           <h1>Notes</h1>
           <NoteCreateTemp />
           {showNotesListComponent && <NotesListTemp />}
        </div>
    );
}

export default NotesListPageTemp;