import { useState } from "react";
import CreateNote from "./CreateNote";
import NoteList from "../components/NoteList";
import { NotesContextProvider } from "../contexts/NotesContext";
import EditablePopoverNote from "./EditablePopoverNote";

function NoteManager() {
  const [currentEditableNote, setCurrentEditableNote] = useState(null);

  return (
    <div>
      <NotesContextProvider>
        <CreateNote />
        <NoteList onNoteClick={(note) => setCurrentEditableNote(note)} />
        {currentEditableNote && (
          <EditablePopoverNote
            note={currentEditableNote}
            onOutsideClick={() => setCurrentEditableNote(null)}
          />
        )}
      </NotesContextProvider>
    </div>
  );
}

export default NoteManager;
