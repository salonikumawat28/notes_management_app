const mongoose = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(mongoose);

// Note: Setting _id to false so that mongoose doesn't auto create the _id.
const userSchema = new mongoose.Schema(
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
  },{ _id: false }
);

// Note: Setting mongoose-sequence to auto increment the _id.
userSchema.plugin(AutoIncrement, { id: "user_id_counter", inc_field: "_id" });

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
