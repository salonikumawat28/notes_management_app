const mongoose = require("mongoose");

// TODO: constraints are not matching with out validator. Correct it.
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2, // Minimum length of 2 characters
      maxlength: 50, // Maximum length of 50 characters
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      maxlength: 320, // Maximum length for an email address
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    _createdAt: Date,
    _updatedAt: Date,
  }
);

// Auto record created and updated timestamps
usersSchema.pre('save', function(next) {
  const currentDate = new Date();

  // Update the _updatedAt field
  this._updatedAt = currentDate;

  // If the document is new, set the _createdAt field
  if (!this._createdAt) {
    this._createdAt = currentDate;
  }

  next();
});

const usersModel = mongoose.model("User", usersSchema);
module.exports = usersModel;
