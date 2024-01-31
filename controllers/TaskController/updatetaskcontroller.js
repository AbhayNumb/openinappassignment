const Task = require("../../models/task");

async function updateTask(req, res) {
  const taskId = req.params.taskId; // Extract task ID from the route parameters
  const { due_date, status } = req.body;
  console.log(taskId);
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
    // Update task properties if provided in the request body
    if (due_date) {
      task.due_date = due_date;
    }

    if (status) {
      task.status = status;
    }

    // Save the updated task
    const updatedTask = await task.save();

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { updateTask };
