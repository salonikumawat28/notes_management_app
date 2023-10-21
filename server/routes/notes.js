var express = require('express');
const notesController = require('../controllers/notesController');
const authenticateJWT = require('../middlewares/authenticateJwt');
var router = express.Router();

/* Get notes listing. */
router.get('/', authenticateJWT, notesController.getNotes);

/* Get a specific note by ID. */
router.get('/:id', authenticateJwt, notesController.getNote);

/* Create a new note. */
router.post('/', authenticateJwt, notesController.createNote);

/*  Update the note with new note data. 
* Note: Put method entirely replaces existing note data with new note data.
*/
router.put('/:id', authenticateJwt, notesController.replaceNote);

/* Update the note with new note data.
* Note: Patch method merges the new note data with existing note data.
*/
router.patch('/:id', authenticateJwt, notesController.updateNote);

/* Delets a note by ID. */
router.delete('/:id', authenticateJwt, notesController.deleteNote);

module.exports = router;
