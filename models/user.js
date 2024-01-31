const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  priority: {
    type: Number,
    enum: [0, 1, 2], // Only allow values 0, 1, or 2
    default: 2, // Default value if not provided
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
