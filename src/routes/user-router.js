import express from "express";

import {
  addUser,
  loginUser,
  checkUser,
} from "../controllers/user-controller.js";
import checkAuth from "../utils/checkAuth.js";
import { body } from "express-validator";

const router = express.Router();
router.post(
  "/user/register",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("name").isLength({ min: 2 }),
  addUser
);
router.post(
  "/user/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  loginUser
);
router.get("/user/me", checkAuth, checkUser);

export default router;
