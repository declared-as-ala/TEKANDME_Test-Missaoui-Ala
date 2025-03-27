// server/src/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    description: {
      type: String,
      default: "",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // If you want to associate tasks with a user:
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Example virtual to color-code
taskSchema.virtual("dueStatus").get(function () {
  const now = new Date();
  if (this.isCompleted) return "completed";
  if (this.dueDate < now) return "overdue";
  const diffDays = Math.ceil((this.dueDate - now) / (1000 * 60 * 60 * 24));
  return diffDays <= 3 ? "urgent" : "upcoming";
});

module.exports = mongoose.model("Task", taskSchema);
