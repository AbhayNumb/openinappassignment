const Subtask = require("../../models/subtask");
const uuid = require("uuid");

async function createSubtask(req, res) {
  const { taskId, title, status } = req.body;
  console.log(taskId, title, status);
  const user = req.user;
  try {
    const newSubtask = new Subtask({
      subtaskId: `Subtask_${uuid.v4()}`, // Generate a unique subtaskId
      taskId,
      title,
      status: status || 0, // Default to TODO if status is not provided
      user,
    });

    const savedSubtask = await newSubtask.save();

    res
      .status(201)
      .json({ message: "Subtask created successfully", subtask: savedSubtask });
  } catch (error) {
    console.error("Error creating subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { createSubtask };
