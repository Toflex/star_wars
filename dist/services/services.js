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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchData = exports.GetPeople = exports.GetFilms = void 0;
const axios_1 = __importDefault(require("axios"));
const configs_1 = require("../db/configs");
const helper_1 = require("../utility/helper");
require("dotenv").config();
const rootAPI = "https://swapi.py4e.com/api";
const HOST_URL = process.env.SERVER_HOST;
// GetFilms
const GetFilms = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let next = `${rootAPI}/films/`;
    while (next !== null) {
        try {
            const { data } = yield axios_1.default.get(next);
            let result = data.results;
            next = data.next;
            if (Array.isArray(result)) {
                let films = [];
                let film;
                for (var r of result) {
                    let characterId = (_a = r.characters) === null || _a === void 0 ? void 0 : _a.map((c) => (0, helper_1.ExtractIDFromURL)(c)).join();
                    film = {
                        title: r.title,
                        episode_id: r.episode_id,
                        opening_crawl: r.opening_crawl,
                        character_count: r.characters.length,
                        characters: characterId,
                        characters_url: `${HOST_URL}/${r.episode_id}/characters`,
                        comments: `${HOST_URL}/${r.episode_id}/comments`,
                        comment_count: 0,
                        director: r.director,
                        producer: r.producer,
                        release_date: r.release_date,
                        created: r.created,
                    };
                    films.push(film);
                }
                configs_1.FilmModel.bulkCreate(films, { ignoreDuplicates: true });
            }
        }
        catch (error) {
            console.error(`An error occured. ${error}`);
            next = null;
        }
    }
});
exports.GetFilms = GetFilms;
// GetPeople
const GetPeople = () => __awaiter(void 0, void 0, void 0, function* () {
    let next = `${rootAPI}/people`;
    while (next) {
        try {
            const { data } = yield axios_1.default.get(next);
            let result = data.results;
            next = data.next;
            if (Array.isArray(result)) {
                let peoples = [];
                let people;
                for (var r of result) {
                    people = {
                        id: Number((0, helper_1.ExtractIDFromURL)(r.url)),
                        name: r.name,
                        height: r.height,
                        mass: r.mass,
                        hair_color: r.hair_color,
                        skin_color: r.skin_color,
                        eye_color: r.eye_color,
                        birth_year: r.birth_year,
                        gender: r.gender,
                    };
                    peoples.push(people);
                }
                configs_1.PeopleModel.bulkCreate(peoples, { ignoreDuplicates: true });
            }
        }
        catch (error) {
            console.error(`An error occured. ${error}`);
            next = null;
        }
    }
});
exports.GetPeople = GetPeople;
const FetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.GetFilms)();
    yield (0, exports.GetPeople)();
});
exports.FetchData = FetchData;
//# sourceMappingURL=services.js.map