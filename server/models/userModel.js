const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

const AutoIncrement = AutoIncrementFactory(mongoose);

// Note: Setting _id to false so that mongoose doesn't auto create the _id.
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
  }, {_id: false});

  // Note: Setting mongoose-sequence to auto increment the _id. 
userSchema.plugin(AutoIncrement, {inc_field: '_id'});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
