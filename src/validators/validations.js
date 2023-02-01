import { body } from "express-validator";

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("name").isLength({ min: 2 }),
];

export const movieValidation = [body("movie"), body("score").isNumeric()];
