import { DataTypes, Dialect, Sequelize } from "sequelize";
import { FetchData } from "../services/services";
import config =  require('../configs/env');

const dbName = config.DB_NAME as string;
const dbUser = config.DBUSER as string;
const dbHost = config.DB_HOST as string;
const dbDriver = config.DIALECT as Dialect;
const dbPassword = config.DB_PASSWORD;

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});

export const FilmModel = sequelizeConnection.define(
  "FilmTable",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    episode_id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    opening_crawl: {
      type: DataTypes.TEXT,
    },
    characters: {
      type: DataTypes.TEXT,
    },
    character_count: {
      type: DataTypes.INTEGER,
    },
    characters_url: { // URL to display characters featured in this movie
      type: DataTypes.TEXT,
    },
    comments: { // URL to display comments for this movie
      type: DataTypes.STRING,
    },
    comment_count: {
      type: DataTypes.INTEGER,
    },
    director: {
      type: DataTypes.STRING,
    },
    producer: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.STRING,
    },
    created: {
      type: DataTypes.DATE,
    }
  },
  {
    freezeTableName: true,
    indexes: [{
      unique: true,
      fields: ['episode_id']
    }]
  }
);

export const CommentModel = sequelizeConnection.define(
  "CommentTable",
  {
    episode_id: {
      type: DataTypes.INTEGER,
    },
    author_name: {
      type: DataTypes.STRING,
      defaultValue: "anonymous",
    },
    message: {
      type: DataTypes.STRING(500),
    },
    IPAddress: {
      type: DataTypes.STRING,
    },
    created: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export const PeopleModel = sequelizeConnection.define(
  "PeopleTable",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    height: {
      type: DataTypes.STRING
    },
    elevation: {
      type: DataTypes.STRING
    },
    mass: {
      type: DataTypes.STRING,
    },
    hair_color: {
      type: DataTypes.STRING,
    },
    skin_color: {
      type: DataTypes.STRING,
    },
    eye_color: {
      type: DataTypes.STRING
    },
    birth_year: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    indexes: [{
      unique: true,
      fields: ['id']
    }]
  }
);


// InitTables
export const InitTables = async () => {
  FilmModel.sync({ force: true });
  PeopleModel.sync({ force: true });
 
  // Fetch Star War data
  await FetchData()
};
