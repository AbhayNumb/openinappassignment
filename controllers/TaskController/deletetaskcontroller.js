const Task = require("../../models/task");

async function deleteTask(req, res) {
  const taskId = req.params.taskId; // Extract task ID from the route parameters
  const user = req.user;
  try {
    // Find the task by ID
    const task = await Task.findOne({ taskId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.user !== req.user) {
      return res.status(403).json({
        error: "Forbidden - You are not authorized to update this subtask",
      });
    }
    // Perform soft deletion by updating the status to a value like 'DELETED'
    task.status = "DELETED";

    // Save the updated task
    const updatedTask = await task.save();

    res.json({ message: "Task deleted successfully", task: updatedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { deleteTask };
