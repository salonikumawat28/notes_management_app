import { useState } from "react";

function NoteCreate() {
  const [note, setNote] = useState("");

  async function createNote() {
    const requestInfo = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(note)
    };
    const response = await fetch("http://localhost:9000/notes/", requestInfo);
    const createdNote = await response.json();
    setNote(createdNote);
  }

  function onContentChange(event) {
    setNote({...note, content: event.target.value});
  }

  return (
    <div>
      <form onSubmit={createNote}>
        <label htmlFor="content">Create a new note -</label>
        <textarea
          id="content"
          name="content"
          rows="4"
          cols="50"
          value={note.content}
          onChange={onContentChange}
        ></textarea>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NoteCreate;
