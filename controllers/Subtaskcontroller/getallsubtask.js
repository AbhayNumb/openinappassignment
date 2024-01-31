const Subtask = require("../../models/subtask");

async function getAllTasks(req, res) {
  const { status, page, pageSize } = req.query;

  try {
    let query = { status: { $ne: -1 } }; // Exclude soft-deleted tasks
    // Apply filters if provided
    if (status) {
      query.status = status;
    }
    query.user = req.user;

    // Pagination
    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    // Retrieve tasks based on the filters and pagination
    const subtask = await Subtask.find(query).skip(skip).limit(limit);

    res.json({ subtask });
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getAllTasks };
