const Task = require("../../models/task");

async function getAllTasks(req, res) {
  const { priority, due_date, page, pageSize } = req.query;

  try {
    let query = { status: { $ne: "DELETED" } }; // Exclude soft-deleted tasks
    query.user = req.user;
    // Apply filters if provided
    if (priority) {
      query.priority = priority;
    }

    if (due_date) {
      query.due_date = due_date;
    }

    // Pagination
    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    // Retrieve tasks based on the filters and pagination
    const tasks = await Task.find(query)
      .sort({ due_date: "asc" }) // Sort by due_date in ascending order
      .skip(skip)
      .limit(limit);

    res.json({ tasks });
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getAllTasks };
