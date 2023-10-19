import { useEffect, useState } from "react";
import "../css/Welcome.css";
import axios from "axios";
import EmptyNotesIndicator from "./EmptyNotesIndicator";
import Note from "./Note";
import "../css/NoteList.css";

function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/notes/")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

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
