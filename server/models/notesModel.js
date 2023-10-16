const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

const AutoIncrement = AutoIncrementFactory(mongoose);

// Note: Setting _id to false so that mongoose doesn't auto create the _id.
const notesSchema = new mongoose.Schema({
    content: String
},{_id: false});

// Note: Setting mongoose-sequence to auto increment the _id. 
notesSchema.plugin(AutoIncrement, {id: 'note_id_counter', inc_field: '_id'});

const notesModel = mongoose.model('Notes', notesSchema);

module.exports = notesModel;
