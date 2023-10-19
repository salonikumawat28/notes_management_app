import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/NoteCreate.css";
import _ from "underscore";

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

  async function saveNote() {
    const response = await axios.post("http://localhost:9000/notes/", note);
    const createdNote = response.data;
    return !!_.get(createdNote, "_id");
  }

  const collapseNoteIfOutsideClick = async (event) => {
    // noteCreateRef doesn't belong to this instance of the component.
    if (!noteCreateRef.current) {
        return;
    }

    // Click was inside component.
    if(noteCreateRef.current.contains(event.target)) {
        return;
    }

    // If note is empty, just collapse.
    if (note.title === "" && note.content === "") {
        collapseNote();
        return;
    }

    // Save note and collapse component.
    const noteSaved = await saveNote();
    if (noteSaved) {
        collapseNote();
        setNote({ content: "", title: "" });
    }
};

  useEffect(() => {

    document.addEventListener('mousedown', collapseNoteIfOutsideClick);

    return () => {
      document.removeEventListener('mousedown', collapseNoteIfOutsideClick);
    };
  }, [note, isExpanded]);

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