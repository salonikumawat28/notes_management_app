import "../css/Welcome.css";
import "../css/Note.css";

function Note({ note }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}

export default Note;
