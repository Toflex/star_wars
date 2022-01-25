import express from "express";
import {
  AddComment,
  GetComments,
  GetFilms,
  GetFilm,
  GetMovieCharacters,
} from "./controllers/controller";


const router = express.Router();


router.get("", GetFilms);
router.get("movie/:id", GetFilm);

router.get("/:id/comments", GetComments);
router.post("/:id/comments", AddComment);

router.get("/:id/characters", GetMovieCharacters);



export { router };
