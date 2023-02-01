import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/user.js";

const handleError = (res, error) => {
  res.status(500).json(error);
};

export const addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const pass = req.body.password.toString();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(pass, salt);

    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: passwordHash,
    });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { password, ...userData } = user._doc;

    user
      .save()
      .then(() => {
        res.status(201).json({
          ...userData,
          token,
        });
      })
      .catch((err) => handleError(res, err));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        message: "No such email",
      });
    }
    const isPassValid = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );
    if (!isPassValid) {
      res.status(400).json({
        message: "No such email or wrong password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { password, ...userData } = user._doc;
    res.status(201).json({
      ...userData,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to login",
    });
  }
};

export const checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const { password, ...userData } = user._doc;
    res.status(201).json({
      ...userData,
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};
