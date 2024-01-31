const Subtask = require("../../models/subtask");

async function getallsubtaskwithtaskId(req, res) {
  const taskId = req.params.subtaskId; // Extract subtask ID from the route parameters

  try {
    // Find the subtask by ID
    const subtask = await Subtask.find({ taskId });
    console.log(taskId);
    if (!subtask) {
      return res.status(404).json({ error: "Subtask not found" });
    }

    // Verify if the user is authorized to update the subtask
    if (subtask.user !== req.user) {
      return res.status(403).json({
        error: "Forbidden - You are not authorized to update this subtask",
      });
    }

    res.json({
      message: "Subtask updated successfully",
      subtask: subtask,
    });
  } catch (error) {
    console.error("Error updating subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getallsubtaskwithtaskId };
