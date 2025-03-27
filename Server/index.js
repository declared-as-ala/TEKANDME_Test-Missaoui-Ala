// server/src/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Security & logging middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Global error handler
app.use(errorHandler);

// (Optional) Initialize Cron Jobs after the server is up
require("./cron/notificationCron");

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
