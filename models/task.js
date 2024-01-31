const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskId: { type: String, unique: true }, // Unique taskId field
  title: String,
  description: String,
  due_date: Date,
  priority: String,
  status: String,
  user: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
