import { DataTypes, Dialect, Sequelize } from "sequelize";
import { FetchData } from "../services/services";
require("dotenv").config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST as string;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;

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


// export const PlanetModel = sequelizeConnection.define(
//   "PlanetTable",
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true
//     },
//     name: {
//       type: DataTypes.STRING
//     },
//     rotation_period: {
//       type: DataTypes.STRING
//     },
//     orbital_period: {
//       type: DataTypes.INTEGER
//     },
//     diameter: {
//       type: DataTypes.STRING,
//     },
//     climate: {
//       type: DataTypes.STRING,
//     },
//     gravity: {
//       type: DataTypes.STRING,
//     },
//     terrain: {
//       type: DataTypes.INTEGER
//     },
//     surface_water: {
//       type: DataTypes.STRING,
//     },
//     population: {
//       type: DataTypes.STRING,
//     }
//   },
//   {
//     freezeTableName: true,
//     indexes: [{
//       unique: true,
//       fields: ['id']
//     }]
//   }
// );


// InitTables
export const InitTables = async () => {
  sequelizeConnection.sync({ force: false });
 
  // Fetch Star War data
  await FetchData()
};
