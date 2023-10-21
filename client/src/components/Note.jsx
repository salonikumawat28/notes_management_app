import "../css/Note.css";

function Note({ note, onClick = () => {} }) {
  return (
    <div className="note-card" onClick={onClick}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}

export default Note;
