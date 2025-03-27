// server/src/middlewares/authMiddleware.js
const passport = require("passport");

// Initialize Passport with our JWT strategy
const jwtStrategy = require("../config/passport");
passport.use(jwtStrategy);

module.exports = passport.authenticate("jwt", { session: false });
