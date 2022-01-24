"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMovieCharacters = exports.AddComment = exports.GetComments = exports.GetFilms = void 0;
const configs_1 = require("../db/configs");
const helper_1 = require("../utility/helper");
const pageSize = 10;
const GetFilms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const films = yield configs_1.FilmModel.findAll({
        attributes: {
            exclude: ["characters", "created", "createdAt", "updatedAt"],
        },
        order: [["release_date", "ASC"]],
    });
    return res.json({ status: "success", data: films });
});
exports.GetFilms = GetFilms;
const GetComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const { count, rows } = yield configs_1.CommentModel.findAndCountAll({
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
        data: Object.assign({ results: rows }, (0, helper_1.Paginate)(req, count, page)),
    });
});
exports.GetComments = GetComments;
const AddComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id || null;
    const film = yield configs_1.FilmModel.findByPk(id);
    if (film === null) {
        return res
            .status(404)
            .json({ status: "error", message: `Comment could not be added. Film with id ${id} not found!` });
    }
    //   body: {message, author} message length 500 characters.
    const body = Object.assign({}, req.body);
    if (!body.message) {
        return res
            .status(404)
            .json({ status: "error", message: `Comment could not be added. Message cannot be empty!` });
    }
    const comment = {
        IPAddress: req.ip,
        message: body.message.trim().substring(0, 500),
        episode_id: Number(id),
        author_name: body.author || "anonymous",
        created: new Date().toUTCString()
    };
    const result = configs_1.CommentModel.create(comment);
    if (result != null) {
        const comment_count = film.getDataValue("comment_count");
        console.log(`Comments: ${comment_count}`);
        yield film.update({ comment_count: comment_count + 1 });
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
});
exports.AddComment = AddComment;
const GetMovieCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Query Params sort: {name, height, gender}, order: {DESC, ASC} ASC is default sort order.
    // Query Params filter by gender i.e. gender=male
    const query = Object.assign({}, req.query);
    const sort = query.sort || "name";
    const isValidOrderType = ["ASC", "DESC"].filter((f) => f == query.order);
    const order = isValidOrderType.length ? query.order : "ASC";
    const filter = query.gender;
    const id = req.params.id;
    const filmCharacters = yield configs_1.FilmModel.findByPk(id, {
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
    const characters = yield configs_1.PeopleModel.findAll({
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
            height: (0, helper_1.CM2FeetInch)(TotalHeight),
        },
    });
});
exports.GetMovieCharacters = GetMovieCharacters;
//# sourceMappingURL=controller.js.map