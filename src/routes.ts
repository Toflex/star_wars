import express from "express";
import {
  AddComment,
  GetComments,
  GetFilms,
  GetMovieCharacters,
} from "./controllers/controller";
import apicache from 'apicache'



let cache = apicache.middleware


const onlyStatus200 = (req, res) => res.statusCode === 200
const cacheSuccesses = cache('5 minutes', onlyStatus200)


const router = express.Router();


router.get("/", cacheSuccesses, GetFilms);

router.get("/:id/comments", GetComments);
router.post("/:id/comments", AddComment);

router.get("/:id/characters", cacheSuccesses, GetMovieCharacters);



export { router };
