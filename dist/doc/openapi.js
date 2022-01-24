"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOpenApi = exports.openApiInstance = void 0;
const ts_openapi_1 = require("ts-openapi");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require('dotenv').config();
const Base_Url = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
// create an OpenApi instance to store definitions
exports.openApiInstance = new ts_openapi_1.OpenApi("v1.0", // API version
"Star War Api", // API title
"Describing call the star war APIs documention.", // API description
"AdegunwaToluwalope@gmail.com" // API maintainer
);
// declare servers for the API
exports.openApiInstance.setServers([{ url: `${Base_Url}:${port}` }]);
// set API license
exports.openApiInstance.setLicense("Apache License, Version 2.0", // API license name
"http://www.apache.org/licenses/LICENSE-2.0", // API license url
"http://dummy.io/terms/" // API terms of service
);
function initOpenApi(app, openApi) {
    // generate our OpenApi schema
    const openApiJson = openApi.generateJson();
    // we'll create an endpoint to reply with openapi schema
    app.get("/openapi.json", function (_req, res) {
        res.json(openApiJson);
    });
    // this will make openapi UI available with our definition
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApiJson));
}
exports.initOpenApi = initOpenApi;
//# sourceMappingURL=openapi.js.map