const Task = require('../../models/task');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

async function createTask(req, res) {
  const { title, description, due_date, priority, status } = req.body;
  console.log(req.user);
  // Extract username from JWT
  const user = req.user;
 console.log(title,user);
  try {
    // Create a new task with a unique taskId
    const newTask = new Task({
      taskId: `Task_${uuid.v4()}`, // Generate a unique taskId
      title,
      description,
      due_date,
      priority,
      status,
      user
    });

    // Save the task to the database
    const savedTask = await newTask.save();
    
    res.status(201).json({ message: 'Task created successfully.', task: savedTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { createTask };
