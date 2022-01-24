import axios from "axios";
import { FilmModel, PeopleModel } from "../db/configs";
import { Film, Planet, People } from "../db/models/model";
import { ExtractIDFromURL } from "../utility/helper";
import config =  require('../config');


const rootAPI = "https://swapi.py4e.com/api";
const HOST_URL = config.DEBUG ? `${config.HOST}:${config.PORT}`: config.HOST ;

// GetFilms
export const GetFilms = async () => {
  let next: string = `${rootAPI}/films/`;

  while (next !== null) {
    try {
      const { data } = await axios.get(next);
      let result = data.results;

      next = data.next;
      if (Array.isArray(result)) {
        let films = [];
        let film: Film;
        for (var r of result) {
          let characterId = r.characters
            ?.map((c) => ExtractIDFromURL(c))
            .join();
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
        FilmModel.bulkCreate(films, { ignoreDuplicates: true });
      }
    } catch (error) {
      console.error(`An error occured. ${error}`);
      next = null;
    }
  }
};

// GetPeople
export const GetPeople = async () => {
  let next = `${rootAPI}/people`;
  while (next) {
    try {
      const { data } = await axios.get(next);
      let result = data.results;

      next = data.next;
      if (Array.isArray(result)) {
        let peoples = [];
        let people: People;
        for (var r of result) {
          people = {
            id: Number(ExtractIDFromURL(r.url)),
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
        PeopleModel.bulkCreate(peoples, { ignoreDuplicates: true });
      }
    } catch (error) {
      console.error(`An error occured. ${error}`);
      next = null;
    }
  }
};

export const FetchData = async () => {
  await GetFilms();
  await GetPeople();
};
