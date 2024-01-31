const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  subtaskId: {
    type: String,
    required: true,
    unique: true,
  },
  taskId: {
    type: String,
    ref: "Task",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: Number,
    enum: [0, 1, -1], // 0 for TODO, 1 for DONE,-1 for deletion
    default: 0,
  },

  user: String,
  // Add other fields as needed
});

const Subtask = mongoose.model("Subtask", subtaskSchema);

module.exports = Subtask;
