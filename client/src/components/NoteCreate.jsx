import { useEffect, useRef, useState } from "react";
import "../css/NoteCreate.css";

function NoteCreate() {
  const [note, setNote] = useState({ content: "", title: "" });
  const [isExpanded, setExpanded] = useState(false);
  const noteCreateRef = useRef(null);

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

  const expandNote = () => {
    if (!isExpanded) {
        setExpanded(true);
    }
  };

  const collapseNote = () => {
    if (isExpanded) {
        setExpanded(false);
    }
  }

  useEffect(() => {
    const collapseNoteIfOutsideClick = (event) => {
        // noteCreateRef doesn't belong to this instance of the component.
        if (!noteCreateRef.current) {
            return;
        }

        // Click was inside component.
        if(noteCreateRef.current.contains(event.target)) {
            return;
        }

        // Collapse note.
        collapseNote();
    };

    document.addEventListener('mousedown', collapseNoteIfOutsideClick);

    return () => {
      document.removeEventListener('mousedown', collapseNoteIfOutsideClick);
    };
  }, []);

  return (
    <div className={`create-note ${isExpanded ? "expanded" : ""}`} ref={noteCreateRef}>
      {isExpanded && <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleTitleChange}
      />}
      <textarea
        name="content"
        onClick={expandNote}
        placeholder="Take a note..."
        rows={isExpanded ? 3 : 1}
        value={note.content}
        onChange={handleContentChange}
      />
    </div>
  );
}

export default NoteCreate;