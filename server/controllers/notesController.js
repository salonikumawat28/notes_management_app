// Create sample note data
let notes = new Map();
notes.set(1, { id: 1, content: 'This is my note first.' });
notes.set(2, { id: 2, content: 'This is my note Second.' });

/* Get notes listing. */
function getNotes(req, res, next) {
    res.send(Array.from(notes.values()));
}

/* Get a specific note by ID. */
function getNote(req, res, next) {
    const noteId = parseInt(req.params.id);
    const note = notes.get(noteId);

    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
}

/* Create a new note. */
function createNote(req, res, next) {
    let newNote = req.body;
    if (!newNote.content) {
        res.status(400).json({ message: 'Content is required' });
        return;
    }

    newNote["id"] = notes.size + 1;
    notes.set(newNote.id, newNote);
    res.status(201).json(newNote);
}

/*  Replace the note with new note data. 
*/
function replaceNote(req, res, next) {
    const noteId = parseInt(req.params.id);
    const note = notes.get(noteId);
    if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
    }

    let newNote = req.body;
    newNote["id"] = noteId;
    if (!newNote.content) {
        res.status(400).json({ message: 'Full Name is required' });
        return;
    }

    notes.set(noteId, newNote);
    res.json(newNote);
}

/* Update the note with new note data.
*/
function updateNote(req, res, next) {
    const noteId = parseInt(req.params.id);
    const note = notes.get(noteId);
    if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
    }

    let noteData = req.body;
    noteData["id"] = noteId;
    const newNote = {
        ...note,
        ...noteData
    }
    notes.set(noteId, newNote);
    res.json(newNote);
}

/* Delets a note by ID. */
function deleteNote(req, res, next) {
    const noteId = parseInt(req.params.id);
    const isNoteExists = notes.has(noteId);

    if (!isNoteExists) {
        res.status(404).json({ message: 'Note not found' });
        return;
    }

    const isNoteDeleted = notes.delete(noteId);
    if (isNoteDeleted) {
        res.json({ message: 'Note deleted successfully' });
    } else {
        res.status(404).json({ message: 'Unable to delete note' });
    }
}

const notesController = {
    getNotes,
    getNote,
    createNote,
    replaceNote,
    updateNote,
    deleteNote
}

module.exports = notesController;