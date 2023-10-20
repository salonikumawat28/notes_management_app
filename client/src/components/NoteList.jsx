import EmptyNotesIndicator from "./EmptyNotesIndicator";
import Note from "./Note";
import { useNotesContext } from "../contexts/NotesContext";
import "../css/NoteList.css";

function NoteList() {
  const { notes } = useNotesContext();

  return (
    <div className="NoteList">
      {notes.length === 0 ? (
        <EmptyNotesIndicator />
      ) : (
        notes.map((note) => <Note key={note["_id"]} note={note} />)
      )}
    </div>
  );
}

export default NoteList;
