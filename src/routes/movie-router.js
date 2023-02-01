import express from "express";
import {
  getMovies,
  getMovie,
  deleteMovie,
  postMovie,
  updateMovie,
} from "../controllers/movie-controller.js";
import checkAuth from "../utils/checkAuth.js";
import { movieValidation } from "../validators/validations.js";

const router = express.Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovie);
router.delete("/movies/:id", checkAuth, deleteMovie);
router.post("/movies", checkAuth, postMovie);
router.patch("/movies/:id", updateMovie);

export default router;
