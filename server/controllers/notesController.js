const { InternalServerError } = require("../errors/errors");
const notesService = require("../services/notesService");

/* Get notes listing. */
async function getNotes(req, res, next) {
  // Sanity check if request went through all middlewares.
  if (!req.authenticatedUserId || !req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
  }

  const authorId = req.authenticatedUserId;
  if (req.query && req.query.search) {
    // Search notes by search query for the current user.
    notesService
      .searchNotes(req.query.search, authorId)
      .then((notes) => res.send(notes))
      .catch((error) => next(error));
  } else {
    // Get all notes of the current user.
    notesService
    .getNotes(authorId)
    .then((notes) => res.send(notes))
    .catch((error) => next(error));
  }
}

/* Get a specific note by ID. */
async function getNote(req, res, next) {
  // Sanity check if request went through all middlewares.
  if (!req.authenticatedUserId || !req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
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
  // Sanity check if request went through all middlewares.
  if (!req.authenticatedUserId || !req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
  }

  // Create note.
  const noteToCreate = req.body;
  const authorId = req.authenticatedUserId;
  notesService
    .createNote(noteToCreate, authorId)
    .then((createdNote) => res.status(201).json(createdNote))
    .catch((error) => next(error));
}

/* Update the note with new note data.
 */
async function updateNote(req, res, next) {
  // Sanity check if request went through all middlewares.
  if (!req.authenticatedUserId || !req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
  }

  // Update the note.
  const noteDataToUpdate = req.body;
  const authorId = req.authenticatedUserId;
  const noteId = req.params.id;
  notesService
    .updateNote(noteDataToUpdate, noteId, authorId)
    .then((updatedNote) => res.json(updatedNote))
    .catch((error) => next(error));
}

/* Deletes a note by ID. */
async function deleteNote(req, res, next) {
  // Sanity check if request went through all middlewares.
  if (!req.authenticatedUserId || !req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
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
