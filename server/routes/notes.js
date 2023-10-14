var express = require('express');
const notesController = require('../controllers/notesController');
var router = express.Router();

/* Get notes listing. */
router.get('/', notesController.getNotes);

/* Get a specific note by ID. */
router.get('/:id', notesController.getNote);

/* Create a new note. */
router.post('/', notesController.createNote);

/*  Update the note with new note data. 
* Note: Put method entirely replaces existing note data with new note data.
*/
router.put('/:id', notesController.replaceNote);

/* Update the note with new note data.
* Note: Patch method merges the new note data with existing note data.
*/
router.patch('/:id', notesController.updateNote);

/* Delets a note by ID. */
router.delete('/:id', notesController.deleteNote);

module.exports = router;
