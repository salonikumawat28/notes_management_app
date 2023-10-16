const notesModel = require("../models/notesModel");

/* Get notes listing. */
async function getNotes(req, res, next) {
    const notesArr = await notesModel.find({});
    res.send(notesArr);
}

/* Get a specific note by ID. */
async function getNote(req, res, next) {
    const noteId = parseInt(req.params.id);
    const note = await notesModel.findById(noteId);

    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
}

/* Create a new note. */
async function createNote(req, res, next) {
    let newNote = req.body;
    if (!newNote.content) {
        res.status(400).json({ message: 'Content is required' });
        return;
    }

    const createdNote = await notesModel.create(newNote);
    res.status(201).json(newNote);
}

/*  Replace the note with new note data. 
*/
async function replaceNote(req, res, next) {
    const noteId = parseInt(req.params.id);

    let newNote = req.body;
    newNote["_id"] = noteId;
    if (!newNote.content) {
        res.status(400).json({ message: 'Full Name is required' });
        return;
    }

    const replacedNote = await notesModel.findOneAndUpdate({_id: noteId}, newNote, {new: true});
    res.json(replacedNote);
}

/* Update the note with new note data.
*/
async function updateNote(req, res, next) {
    const noteId = parseInt(req.params.id);

    let noteData = req.body;
    noteData["_id"] = noteId;
    const updatedNote = await userModel.findOneAndUpdate({_id: noteId}, {$set: noteData}, {new: true});
    res.json(updatedNote);
}

/* Delets a note by ID. */
async function deleteNote(req, res, next) {
    const noteId = parseInt(req.params.id);
    
    const deletedNote = await notesModel.findByIdAndDelete(noteId);
    if (deletedNote) {
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