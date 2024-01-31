// routes/userRoutes.js
const express = require("express");
const router = express.Router();
// const todocontroller = require('../controllers/todocontroller');
const createtask = require("../controllers/TaskController/createtaskcontroller");
const authMiddleware = require("../middlewares/authneticate");
const updatetask = require("../controllers/TaskController/updatetaskcontroller");
const deleteTask = require("../controllers/TaskController/deletetaskcontroller");
const getTask = require("../controllers/TaskController/gettallcontroller");
// // Define routes
// router.get('/', todocontroller.getUser);
router.post(
  "/create-task",
  authMiddleware.authenticateJWT,
  createtask.createTask
);
router.put(
  "/update-task/:taskId",
  authMiddleware.authenticateJWT,
  updatetask.updateTask
);
router.delete(
  "/delete-task/:taskId",
  authMiddleware.authenticateJWT,
  deleteTask.deleteTask
);
router.get("/get-task", authMiddleware.authenticateJWT, getTask.getAllTasks);
module.exports = router;
