const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { name, email, password, age, gender } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(401).json({
          message: "Error hashing password",
        });
      }
      const user = new UserModel({
        name,
        email,
        password: hash,
        age,
        gender,
      });
      await user.save();
      res.status(201).json({
        message: "User registered successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred during user registration",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      if (result) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({
          message: "Login successful",
          token,
        });
      } else {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: `Error occurred during login ${error}`,
    });
  }
});

module.exports = userRouter;
