"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controllers/controller");
const apicache_1 = __importDefault(require("apicache"));
let cache = apicache_1.default.middleware;
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache('5 minutes', onlyStatus200);
const router = express_1.default.Router();
exports.router = router;
router.get("/", cacheSuccesses, controller_1.GetFilms);
router.get("/:id/comments", controller_1.GetComments);
router.post("/:id/comments", controller_1.AddComment);
router.get("/:id/characters", cacheSuccesses, controller_1.GetMovieCharacters);
//# sourceMappingURL=routes.js.map