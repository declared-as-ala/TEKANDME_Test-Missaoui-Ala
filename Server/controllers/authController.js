// server/src/controllers/authController.js
const { validationResult } = require("express-validator");
const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const newUser = await authService.registerUser(email, password);
    return res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};
