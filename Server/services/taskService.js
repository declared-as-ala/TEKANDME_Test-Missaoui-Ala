// server/src/services/taskService.js
const Task = require("../models/Task");

exports.createTask = async (data) => {
  const task = await Task.create(data);
  return task;
};

exports.getAllTasks = async (userId, query) => {
  const { status, search, sort } = query;

  // Build a filter object
  let filter = { user: userId };
  // Status filter
  if (status === "completed") {
    filter.isCompleted = true;
  } else if (status === "pending") {
    filter.isCompleted = false;
  }

  // Search filter
  if (search) {
    // For text search, define indexes in Task model or use regex
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Sort logic
  let sortOption = { createdAt: -1 }; // default
  if (sort === "dueDate") {
    sortOption = { dueDate: 1 };
  } else if (sort === "title") {
    sortOption = { title: 1 };
  }

  const tasks = await Task.find(filter).sort(sortOption);
  return tasks;
};

exports.getTaskById = async (id, userId) => {
  const task = await Task.findOne({ _id: id, user: userId });
  if (!task) {
    throw new Error("Task not found or not accessible");
  }
  return task;
};

exports.updateTask = async (id, userId, updates) => {
  const task = await Task.findOneAndUpdate({ _id: id, user: userId }, updates, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    throw new Error("Task not found or not accessible");
  }
  return task;
};

exports.deleteTask = async (id, userId) => {
  const task = await Task.findOneAndDelete({ _id: id, user: userId });
  if (!task) {
    throw new Error("Task not found or not accessible");
  }
  return true;
};
