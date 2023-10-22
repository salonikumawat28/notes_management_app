var express = require('express');
const notesController = require('../controllers/notesController');
const authenticateJWT = require('../middlewares/authenticateJwt');
var router = express.Router();

// TODO: what about case when id is undefined or empty?

/* Get notes listing. */
router.get('/', authenticateJWT, notesController.getNotes);

/* Get a specific note by ID. */
router.get('/:id', authenticateJWT, notesController.getNote);

/* Create a new note. */
router.post('/', authenticateJWT, notesController.createNote);

/* Update the note with new note data.
* Note: Patch method merges the new note data with existing note data.
*/
router.patch('/:id', authenticateJWT, notesController.updateNote);

/* Delets a note by ID. */
router.delete('/:id', authenticateJWT, notesController.deleteNote);

module.exports = router;
