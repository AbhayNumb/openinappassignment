const Subtask = require("../../models/subtask");

async function deleteSubtask(req, res) {
  const subtaskId = req.params.subtaskId; // Extract subtask ID from the route parameters
  console.log(subtaskId);
  try {
    // Find the subtask by ID
    const subtask = await Subtask.findOne({ subtaskId });

    if (!subtask) {
      return res.status(404).json({ error: "Subtask not found" });
    }
    if (subtask.user !== req.user) {
      return res.status(403).json({
        error: "Forbidden - You are not authorized to update this subtask",
      });
    }

    // Perform soft deletion by updating the status to a value like 'DELETED'
    subtask.status = -1;

    // Save the updated subtask
    const updatedSubtask = await subtask.save();

    res.json({
      message: "Subtask deleted successfully",
      subtask: updatedSubtask,
    });
  } catch (error) {
    console.error("Error deleting subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { deleteSubtask };
