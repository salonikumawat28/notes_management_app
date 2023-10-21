const { NotFoundError, BadRequestError } = require("../errors");
const notesModel = require("../models/notesModel");
const usersModel = require("../models/usersModel");

/* Get notes listing. */
async function getNotes(req, res, next) {
  // Sanity check if user authorized.
  if (!req.userId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Get notes for the user.
  const notes = await notesModel
    .find({ author: req.userId }, "-author -__v")
    .lean();
  console.log("Notes are: ", notes);
  res.send(notes);

  //   // Convert notes array to notes object.
  //   const notesObject = notes.reduce((acc, note) => {
  //     acc[note._id] = note;
  //     return acc;
  //   }, {});
  //   res.send(notesObject);
}

/* Get a specific note by ID. */
async function getNote(req, res, next) {
  // Sanity check if user authorized.
  if (!req.userId) {
    return next(new UnauthorizedError(" No token provided"));
  }

  // Get note by id.
  const noteId = req.params.id;
  const note = await notesModel.findOne({ _id: noteId, author: req.userId }, "-author -__v");
  if (!note) {
    return next(new NotFoundError("Note not found."));
  }
  res.json(note);
}

/* Create a new note. */
async function createNote(req, res, next) {
  // Sanity check if user authorized.
  if (!req.userId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Validate request inputs.
  let newNote = req.body;
  if (!newNote.content && !newNote.title) {
    return next(new BadRequestError("Either title or content is required"));
  }

  const createdNote = await notesModel.create(newNote);
  res.status(201).json(createdNote);
}

/*  Replace the note with new note data.
 */
async function replaceNote(req, res, next) {
  const noteId = req.params.id;

  let newNote = req.body;
  newNote["_id"] = noteId;
  if (!newNote.content) {
    res.status(400).json({ message: "Full Name is required" });
    return;
  }

  const replacedNote = await notesModel.findOneAndUpdate(
    { _id: noteId },
    newNote,
    { new: true }
  );
  res.json(replacedNote);
}

/* Update the note with new note data.
 */
async function updateNote(req, res, next) {
  const noteId = req.params.id;

  let noteData = req.body;
  noteData["_id"] = noteId;
  const updatedNote = await userModel.findOneAndUpdate(
    { _id: noteId },
    { $set: noteData },
    { new: true }
  );
  res.json(updatedNote);
}

/* Delets a note by ID. */
async function deleteNote(req, res, next) {
  const noteId = req.params.id;

  const deletedNote = await notesModel.findByIdAndDelete(noteId);
  if (deletedNote) {
    res.json({ message: "Note deleted successfully" });
  } else {
    res.status(404).json({ message: "Unable to delete note" });
  }
}

const notesController = {
  getNotes,
  getNote,
  createNote,
  replaceNote,
  updateNote,
  deleteNote,
};

module.exports = notesController;
