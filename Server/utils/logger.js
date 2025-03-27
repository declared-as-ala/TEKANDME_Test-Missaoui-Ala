// server/src/utils/logger.js
const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: 'app.log' })
  ],
});

module.exports = logger;
