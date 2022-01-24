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
exports.InitTables = exports.PeopleModel = exports.CommentModel = exports.FilmModel = exports.sequelizeConnection = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("../services/services");
require("dotenv").config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER;
const dbPassword = process.env.DB_PASSWORD;
exports.sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
});
exports.FilmModel = exports.sequelizeConnection.define("FilmTable", {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    episode_id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    opening_crawl: {
        type: sequelize_1.DataTypes.TEXT,
    },
    characters: {
        type: sequelize_1.DataTypes.TEXT,
    },
    character_count: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    characters_url: {
        type: sequelize_1.DataTypes.TEXT,
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
    },
    comment_count: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    director: {
        type: sequelize_1.DataTypes.STRING,
    },
    producer: {
        type: sequelize_1.DataTypes.STRING,
    },
    release_date: {
        type: sequelize_1.DataTypes.STRING,
    },
    created: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    freezeTableName: true,
    indexes: [{
            unique: true,
            fields: ['episode_id']
        }]
});
exports.CommentModel = exports.sequelizeConnection.define("CommentTable", {
    episode_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    author_name: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "anonymous",
    },
    message: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    IPAddress: {
        type: sequelize_1.DataTypes.STRING,
    },
    created: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
});
exports.PeopleModel = exports.sequelizeConnection.define("PeopleTable", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    height: {
        type: sequelize_1.DataTypes.STRING
    },
    mass: {
        type: sequelize_1.DataTypes.STRING,
    },
    hair_color: {
        type: sequelize_1.DataTypes.STRING,
    },
    skin_color: {
        type: sequelize_1.DataTypes.STRING,
    },
    eye_color: {
        type: sequelize_1.DataTypes.STRING
    },
    birth_year: {
        type: sequelize_1.DataTypes.STRING,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    indexes: [{
            unique: true,
            fields: ['id']
        }]
});
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
const InitTables = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.sequelizeConnection.sync({ force: false });
    // Fetch Star War data
    yield (0, services_1.FetchData)();
});
exports.InitTables = InitTables;
//# sourceMappingURL=configs.js.map