import { Application } from "express";
import { OpenApi } from "ts-openapi";
import swaggerUi from "swagger-ui-express";
import config =  require('../configs/env');


// create an OpenApi instance to store definitions
export const openApiInstance = new OpenApi(
  "v1.0", // API version
  "Star War Api", // API title
  "Describing call the star war APIs documention.", // API description
  "AdegunwaToluwalope@gmail.com" // API maintainer
);

// declare servers for the API
openApiInstance.setServers([{ url: config.DEBUG == 'true' ? `${config.HOST}:${config.PORT}`: config.HOST }]);

// set API license
openApiInstance.setLicense(
  "Apache License, Version 2.0", // API license name
  "http://www.apache.org/licenses/LICENSE-2.0", // API license url
  "http://dummy.io/terms/" // API terms of service
);

export function initOpenApi(app: Application, openApi: OpenApi) {
  // generate our OpenApi schema
  const openApiJson = openApi.generateJson();

  // we'll create an endpoint to reply with openapi schema
  app.get("/openapi.json", function (_req, res) {
    res.json(openApiJson);
  });
  // this will make openapi UI available with our definition
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiJson));
}