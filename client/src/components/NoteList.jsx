import "../css/Welcome.css";
import EmptyNotesIndicator from "./EmptyNotesIndicator";
import Note from "./Note";
import "../css/NoteList.css";
import { useNotesContext } from "../contexts/NotesContext";

function NoteList() {
  const { notes } = useNotesContext();

  return (
    <div>
      {notes.length === 0 ? (
        <EmptyNotesIndicator />
      ) : (
        notes.map((note) => <Note key={note["_id"]} note={note} />)
      )}
    </div>
  );
}

export default NoteList;
