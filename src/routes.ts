import express from "express";
import {
  AddComment,
  GetComments,
  GetFilms,
  GetFilm,
  GetMovieCharacters,
} from "./controllers/controller";


const router = express.Router();


router.get("/", GetFilms);
router.get("/movie/:id", GetFilm);

router.get("/movie/:id/comments", GetComments);
router.post("/movie/:id/comments", AddComment);

router.get("/movie/:id/characters", GetMovieCharacters);



export { router };
