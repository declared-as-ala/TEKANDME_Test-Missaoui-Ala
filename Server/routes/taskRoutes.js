// server/src/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const { taskValidation } = require("../middlewares/validation");

// Protected routes
router.use(authMiddleware);

router
  .route("/")
  .get(taskController.getTasks)
  .post(taskValidation, taskController.createTask);

router
  .route("/:id")
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
