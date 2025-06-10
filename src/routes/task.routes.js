const express = require("express");
const router = express.Router();

const {
  getUserTask,
  createUserTask,
  updateUserTask,
  completeUserTask,
  taskUserDelete,
} = require("../controllers/task.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/getTasks", verifyToken, getUserTask);
router.post("/createTask", verifyToken, createUserTask);
router.put("/updateTask/:id", verifyToken, updateUserTask);
router.patch("/:id/complete", verifyToken, completeUserTask);
router.delete("/deleteTask/:id", verifyToken, taskUserDelete);

module.exports = router;
