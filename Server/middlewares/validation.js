// server/src/middlewares/validation.js
const { body } = require("express-validator");

exports.taskValidation = [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("dueDate")
    .not()
    .isEmpty()
    .withMessage("Due Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),
];

exports.registerValidation = [
  body("email").isEmail().withMessage("Must be a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Must be a valid email"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
