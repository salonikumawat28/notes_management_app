import "../css/Welcome.css";
import EmptyNotesIndicator from "./EmptyNotesIndicator";
import Note from "./Note";
import "../css/NoteList.css";
import { useNotesContext } from "../contexts/NotesContext";

function NoteList({ onNoteClick }) {
  const { notes } = useNotesContext();

  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <EmptyNotesIndicator />
      ) : (
        Object.values(notes).map((note) => (
          <Note
            key={note._id}
            note={note}
            onClick={() => onNoteClick(note)}
          />
        ))
      )}
    </div>
  );
}

export default NoteList;
