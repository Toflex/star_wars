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
const express_1 = __importDefault(require("express"));
const configs_1 = require("./db/configs");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const init_1 = require("./doc/init");
const openapi_1 = require("./doc/openapi");
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.SERVER_PORT || 3000;
// Connect to mysql DB
configs_1.sequelizeConnection.authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connection has been established successfully.');
    (0, configs_1.InitTables)();
}))
    .catch(error => {
    console.error('Unable to connect to the database:', error);
});
app.use(express_1.default.json());
app.use("/", routes_1.router);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup());
// declare our hello world api
(0, init_1.initGetFilms)(app, openapi_1.openApiInstance);
(0, init_1.initGetMovieCharacters)(app, openapi_1.openApiInstance);
(0, init_1.initAddComment)(app, openapi_1.openApiInstance);
(0, init_1.initGetComments)(app, openapi_1.openApiInstance);
// initializes schema endpoint and UI
(0, openapi_1.initOpenApi)(app, openapi_1.openApiInstance);
app.get('/ping', (req, res) => {
    res.status(200).json({ "message": 'Pong...' });
});
app.all('*', (req, res) => {
    res.status(404).json({ "message": 'Not Found!' });
});
// // Start Server
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map