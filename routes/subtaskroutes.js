const express = require("express");
const createsubtaskController = require("../controllers/Subtaskcontroller/createsubtask");
const authMiddleware = require("../middlewares/authneticate");
const updatesubtaskcontroller = require("../controllers/Subtaskcontroller/updatesubtask");
const deletesubtaskcontroller = require("../controllers/Subtaskcontroller/deletesubtask");
const getsubtakcontroller = require("../controllers/Subtaskcontroller/getallsubtask");
const router = express.Router();

// POST /subtasks/create
router.post(
  "/create-subtask",
  authMiddleware.authenticateJWT,
  createsubtaskController.createSubtask
);
router.put(
  "/update-subtask/:subtaskId",
  authMiddleware.authenticateJWT,
  updatesubtaskcontroller.updateSubtask
);

router.delete(
  "/delete-subtask/:subtaskId",
  authMiddleware.authenticateJWT,
  deletesubtaskcontroller.deleteSubtask
);

router.get(
  "/get-subtask",
  authMiddleware.authenticateJWT,
  getsubtakcontroller.getAllTasks
);
module.exports = router;
