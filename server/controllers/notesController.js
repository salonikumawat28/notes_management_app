const { NotFoundError, ValidationError } = require("../errors");
const notesService = require("../services/notesService");

/* Get notes listing. */
async function getNotes(req, res, next) {
  // Sanity check if user authorized.
  if (!req.authenticatedUserId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Get notes for the user.
  const authorId = req.authenticatedUserId;
  notesService
    .getNotes(authorId)
    .then((notes) => res.send(notes))
    .catch((error) => next(error));
}

/* Get a specific note by ID. */
async function getNote(req, res, next) {
  // Sanity check if user authorized.
  if (!req.authenticatedUserId) {
    return next(new UnauthorizedError(" No token provided"));
  }

  // Get note by id.
  const noteId = req.params.id;
  const authorId = req.authenticatedUserId;
  notesService
    .getNote(noteId, authorId)
    .then((note) => res.json(note))
    .catch((error) => next(error));
}

/* Create a new note. */
async function createNote(req, res, next) {
  // Sanity check if user authorized.
  if (!req.authenticatedUserId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Validate request inputs.
  let noteToCreate = req.body;
  if (!noteToCreate.content && !noteToCreate.title) {
    return next(new ValidationError("Either title or content is required"));
  }

  // Create note.
  const authorId = req.authenticatedUserId;
  notesService
    .createNote(noteToCreate, authorId)
    .then((createdNote) => res.status(201).json(createdNote))
    .catch((error) => next(error));
}

/* Update the note with new note data.
 */
async function updateNote(req, res, next) {
  // Sanity check if user authorized.
  if (!req.authenticatedUserId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Validate request inputs.
  let noteDataToUpdate = req.body;
  if (noteDataToUpdate._id && noteDataToUpdate._id !== req.params.id) {
    return next(new ValidationError("Note id doesn't match with URL note id."));
  }
  
  // Update the note.
  const authorId = req.authenticatedUserId;
  const noteId = req.params.id;
  notesService
    .updateNote(noteDataToUpdate, noteId, authorId)
    .then((updatedNote) => res.json(updatedNote))
    .catch((error) => next(error));
}

/* Deletes a note by ID. */
async function deleteNote(req, res, next) {
  // Sanity check if user authorized.
  if (!req.authenticatedUserId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Delete note.
  const noteId = req.params.id;
  const authorId = req.authenticatedUserId;
  notesService
    .deleteNote(noteId, authorId)
    .then((response) => res.json(response))
    .catch((error) => next(error));
}

const notesController = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};

module.exports = notesController;
