import { useState } from "react";
import NoteCreate from "../components/NoteCreate";
import NotesList from "../components/NotesList";

function NotesListPage() {
    const [showNotesListComponent, setShowNotesListComponent] = useState(false);

    function showNotesList() {
        setShowNotesListComponent(!showNotesListComponent);
    }

    return (
        <div>
           <button type="submit" onClick={showNotesList}>Notes</button>
           <h1>Notes</h1>
           <NoteCreate />
           {showNotesListComponent && <NotesList />}
        </div>
    );
}

export default NotesListPage;