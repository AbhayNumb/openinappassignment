const Subtask = require("../../models/subtask");

async function updateSubtask(req, res) {
  const subtaskId = req.params.subtaskId; // Extract subtask ID from the route parameters
  const { status } = req.body;

  try {
    // Find the subtask by ID
    const subtask = await Subtask.findOne({ subtaskId });

    if (!subtask) {
      return res.status(404).json({ error: "Subtask not found" });
    }

    // Verify if the user is authorized to update the subtask
    if (subtask.user !== req.user) {
      return res
        .status(403)
        .json({
          error: "Forbidden - You are not authorized to update this subtask",
        });
    }

    // Update the status of the subtask
    subtask.status = status || 0; // Default to TODO if status is not provided

    // Save the updated subtask
    const updatedSubtask = await subtask.save();

    res.json({
      message: "Subtask updated successfully",
      subtask: updatedSubtask,
    });
  } catch (error) {
    console.error("Error updating subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { updateSubtask };
