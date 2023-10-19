import { useState } from "react";
import "../css/NoteCreate.css";

function NoteCreate() {
  const [note, setNote] = useState({ content: "", title: "" });
  const [isExpanded, setExpanded] = useState(false);

  const handleTitleChange = (event) => {
    setNote((prevNote) => ({
      ...prevNote,
      title: event.target.value,
    }));
  };

  const handleContentChange = (event) => {
    setNote((prevNote) => ({
      ...prevNote,
      content: event.target.value,
    }));
  };

  return (
    <div className={`create-note ${isExpanded ? "expanded" : ""}`}>
      {isExpanded && <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleTitleChange}
      />}
      <textarea
        name="content"
        placeholder="Take a note..."
        rows={isExpanded ? 3 : 1}
        value={note.content}
        onChange={handleContentChange}
      />
    </div>
  );
}

export default NoteCreate;