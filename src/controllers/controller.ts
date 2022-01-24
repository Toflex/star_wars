import { create } from "domain";
import { Request, Response } from "express";
import { CommentModel, FilmModel, PeopleModel } from "../db/configs";
import { Comment } from "../db/models/model";
import { CM2FeetInch, Paginate } from "../utility/helper";

const pageSize = 10;

export const GetFilms = async (req: Request, res: Response) => {
  const films = await FilmModel.findAll({
    attributes: {
      exclude: ["characters", "created", "createdAt", "updatedAt"],
    },
    order: [["release_date", "ASC"]],
  });
  return res.json({ status: "success", data: films });
};

export const GetComments = async (req: Request, res: Response) => {
  const page = Number(req.query.page as string) || 1;

  const { count, rows } = await CommentModel.findAndCountAll({
    where: {
      episode_id: req.params.id,
    },
    attributes: {
      exclude: ["IPAddress"]
    },
    order: [["created", "DESC"]],
    offset: (page * pageSize) - pageSize,
    limit: pageSize,
  });

  return res.json({
    status: "success",
    data: { results: rows, ...Paginate(req, count, page) },
  });
};

export const AddComment = async (req: Request, res: Response) => {

    const id = req.params.id as string || null
    const film = await FilmModel.findByPk(id)
    if (film === null) {
        return res
      .status(404)
      .json({ status: "error", message: `Comment could not be added. Film with id ${id} not found!` });
      }

    //   body: {message, author} message length 500 characters.
      const body = {...req.body}

      if (!body.message){
        return res
        .status(404)
        .json({ status: "error", message: `Comment could not be added. Message cannot be empty!` });  
      }
      const comment: Comment = {
        IPAddress: req.ip,
        message: body.message.trim().substring(0,500),
        episode_id: Number(id),
        author_name: body.author || "anonymous",
        created: new Date().toUTCString()
      }

      const result = CommentModel.create(comment)
        if(result!=null){
          const comment_count = film.getDataValue("comment_count")
          console.log(`Comments: ${comment_count}`);
          
          await film.update({comment_count: comment_count+1})

        return res.status(201).json({
            status: "success",
            message: "Comment has been added"
          });
        }
      else {
          console.error(`An error occured when adding a comment.`);
          
        return res
        .status(404)
        .json({ status: "error", message: `Comment could not be added. Please try again!` });  
      }
};

export const GetMovieCharacters = async (req: Request, res: Response) => {
  // Query Params sort: {name, height, gender}, order: {DESC, ASC} ASC is default sort order.
  // Query Params filter by gender i.e. gender=male
  const query = { ...req.query };
  const sort = (query.sort as string) || "name";
  const isValidOrderType = ["ASC", "DESC"].filter(
    (f) => f == (query.order as string)
  );
  const order = isValidOrderType.length ? (query.order as string) : "ASC";
  const filter = query.gender as string;

  const id = req.params.id;
  const filmCharacters = await FilmModel.findByPk(id, {
    attributes: ["characters"],
  });
  if (filmCharacters == null) {
    return res
      .status(404)
      .json({ status: "error", message: `Film with id ${id} not found!` });
  }

  const whereCondition = filter
    ? {
        id: filmCharacters.getDataValue("characters").split(","),
        gender: filter,
      }
    : { id: filmCharacters.getDataValue("characters").split(",") };

  const characters = await PeopleModel.findAll({
    where: whereCondition,
    order: [[sort, order]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  const TotalHeight = characters
    .map((f) => Number(f.getDataValue("height")))
    .reduce((a, b) => a + b);

  return res.json({
    status: "success",
    data: {
      characters,
      count: characters.length,
      height: CM2FeetInch(TotalHeight),
    },
  });
};
