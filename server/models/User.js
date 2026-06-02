const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["candidate", "employer"],
      default: "candidate",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);       //does two things: Creates a model named "User" , Exports it so other files can use it