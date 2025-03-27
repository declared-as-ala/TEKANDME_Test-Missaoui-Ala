// server/src/middlewares/errorHandler.js
const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.error(err); // Use Winston or console.error
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    // You could add "stack" in dev mode
  });
}

module.exports = errorHandler;
