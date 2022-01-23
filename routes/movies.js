import express from "express";
import {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
} from "../controllers/movies.js";

const router = express.Router();

// get the movie list in the form of JSON
router.get("/", getMovies);

// search for a movie the lst
router.get("/:id", getMovie);

// add movie to the list
router.post("/", addMovie);

// remove movie from the list
router.delete("/:id", deleteMovie);

export default router;
