var express = require("express");
const notesController = require("../controllers/notesController");
const authenticator = require("../middlewares/authenticator");
const requestPreProcessor = require("../middlewares/requestPreProcessor");
const requestValidator = require("../middlewares/requestValidator/validator");
var router = express.Router();

// TODO: what about case when id is undefined or empty?

/* Get notes listing. */
router.get(
  "/",
  requestPreProcessor.preProcessGetNotes,
  requestValidator.validateGetNotes,
  authenticator,
  notesController.getNotes
);

/* Get a specific note by ID. */
router.get(
  "/:id",
  requestPreProcessor.preProcessGetNote,
  requestValidator.validateGetNote,
  authenticator,
  notesController.getNote
);

/* Create a new note. */
router.post(
  "/",
  requestPreProcessor.preProcessCreateNote,
  requestValidator.validateCreateNote,
  authenticator,
  notesController.createNote
);

/* Update the note with new note data.
 * Note: Patch method merges the new note data with existing note data.
 */
router.patch(
  "/:id",
  requestPreProcessor.preProcessUpdateNote,
  requestValidator.validateUpdateNote,
  authenticator,
  notesController.updateNote
);

/* Delets a note by ID. */
router.delete(
  "/:id",
  requestPreProcessor.preProcessDeleteNote,
  requestValidator.validateDeleteNote,
  authenticator,
  notesController.deleteNote
);

module.exports = router;
