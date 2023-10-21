import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/EditableNote.css";
import { useNotesContext } from "../contexts/NotesContext";
import { useAuthContext } from "../contexts/AuthContext";

function EditableNote({
  initialNote = {},
  isExpanded = true,
  onOutsideClick = () => {},
}) {
  const { notes, setNotes } = useNotesContext();
  const {user} = useAuthContext();
  console.log("Initial editable note: ", initialNote);
  const [note, setNote] = useState(initialNote);
  const editableNoteRef = useRef(null);

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

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    async function saveOrUpdateNote() {
      const response = !note._id
        ? await axios.post("http://localhost:9000/users/" + user._id + "/notes/", {note, author: user._id})
        : await axios.put("http://localhost:9000/users/" + user._id + "/notes/", note);
      const editedNote = response.data;
      if (editedNote._id) {
        setNotes({...notes, [editedNote._id]: editedNote});
        return true;
      }
      return false;
    }

    const handleIfOutsideClick = async (event) => {
      // editableNoteRef doesn't belong to this instance of the component.
      if (!editableNoteRef.current) {
        return;
      }

      // Click was inside component.
      if (editableNoteRef.current.contains(event.target)) {
        return;
      }

      // If note is empty, just collapse.
      if (note.title === "" && note.content === "") {
        onOutsideClick();
        return;
      }

      // Save note and collapse component.
      const success = await saveOrUpdateNote();
      if (success) {
        setNote(null);
        onOutsideClick();
      }
      // TODO: In else show error to the user.
    };

    document.addEventListener("mousedown", handleIfOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleIfOutsideClick);
    };
  }, [note, editableNoteRef]);

  return (
    <div
      className={`editable-note ${isExpanded ? "expanded" : ""}`}
      ref={editableNoteRef}
    >
      {isExpanded && (
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleTitleChange}
        />
      )}
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

export default EditableNote;
