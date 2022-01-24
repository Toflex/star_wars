import { Application } from "express";
import { OpenApi, Types } from "ts-openapi";
import { AddComment, GetComments, GetFilms, GetMovieCharacters } from "../controllers/controller";

// body response schema
const genericResponseSchema = Types.Object({
  description: "Server response",
  properties: {
    status: Types.String({
      description: "Request status",
      example: "success/error",
    }),
    message: Types.String({
      description: "Response message from the server",
      maxLength: 100,
      required: true,
    }),
  },
});

export function initGetFilms(app: Application, openApi: OpenApi) {
  app.get("/", GetFilms);

    // body response schema
    const responseSchema = Types.Object({
      description: "Server response",
      properties: {
        status: Types.String({
          description: "Request status",
          example: "success/error",
        }),
        data: Types.Object({
          description: "Returns all movies",
          properties: {
            results: Types.Array({
              arrayType: Types.Object({
                properties: {
                  title: Types.String(),
                  episode_id: Types.Integer(),
                  opening_crawl: Types.String(),
                  character_count: Types.Integer(),
                  characters_url: Types.String(),
                  comments: Types.String(),
                  comment_count: Types.Integer(),
                  director: Types.String(),
                  producer: Types.String(),
                  release_date: Types.Date(),
                },
            }),
            description: "Array of movies"
            }),
           }
        })
      },
    });

  // declare our API
  openApi.addPath(
    "/", // this is API path
    {
      // API method
      get: {
        description: "Get Star wars films episodes", // Method description
        summary:
          "Returns a list of Star war episode along with their characters.", // Method summary
        operationId: "GetFilms",
        responses: {
          // here we declare the response types
          200: openApi.declareSchema(
            "Get movie list success",
            responseSchema
          ),
        },
        tags: ["Star Wars Apis"], // these tags group your methods in UI
      },
    },
    true // make method visible
  );
}

export function initGetComments(app: Application, openApi: OpenApi) {
  app.get("/:id/comments", GetComments);

  // body response schema
  const responseSchema = Types.Object({
    description: "Server response",
    properties: {
      status: Types.String({
        description: "Request status",
        example: "success/error",
      }),
      message: Types.String({
        description: "Response message from the server",
      }),
      data: Types.Object({
        description: "Returns all comments associated with a movie",
        properties: {
          results: Types.Array({
            arrayType: Types.Object({
              properties: {
                  id: Types.Integer(),
                  episode_id: Types.Integer(),
                  author_name: Types.String(),
                  message: Types.String(),
                  created: Types.String(),
              },
          }),
          description: "Array of comments"
          }),
          next: Types.String({description: "link to next page"}),
          count: Types.Integer({description: "Total number of comments"}),
        }
      })
    },
  });

  // declare our API
  openApi.addPath(
    "/:id/comments", // this is API path
    {
      // API method
      get: {
        description: "Get Star wars films comments", // Method description
        summary: "Returns a list of comments for a Star war episode.", // Method summary
        operationId: "GetComments",
        requestSchema: {
          params: {
            id: Types.Number({
              description: "Film ID",
              required: true, // param values MUST be required
              example: 2,
            }),
          },
        },
        responses: {
          200: openApi.declareSchema(
            "Get comment success",
            responseSchema
          ),
        },
        tags: ["Star Wars Apis"], // these tags group your methods in UI
      },
    },
    true // make method visible
  );
}

export function initAddComment(app: Application, openApi: OpenApi) {
  app.post("/:id/comments", AddComment);

  const commonProperties = {
    message: Types.String({
      description: "Comment messsage",
      maxLength: 500,
      required: true,
    }),
    author: Types.String({
      description: "Comment author",
      required: false,
    }),
  };

  // declare our API
  openApi.addPath(
    "/:id/comments", // this is API path
    {
      // API method
      post: {
        description: "Add comment to a Star wars film.", // Method description
        summary: "Add comment to a Star wars film.", // Method summary
        operationId: "AddComment",
        requestSchema: {
          body: Types.Object({
            description: "Add comment to a start war episode.",
            properties: commonProperties,
          }),
          params: {
            id: Types.Number({
              description: "Film ID",
              required: true, // param values MUST be required
              example: 2,
            }),
          },
        },

        responses: {
          // here we declare the response types
          201: openApi.declareSchema(
            "Get comment success",
            genericResponseSchema
          ),
          400: openApi.declareSchema(
            "Get comment failure message",
            genericResponseSchema
          ),
        },
        tags: ["Star Wars Apis"], // these tags group your methods in UI
      },
    },
    true // make method visible
  );
}


export function initGetMovieCharacters(app: Application, openApi: OpenApi) {
  app.get("/:id/characters", GetMovieCharacters);

  // body response schema
  const responseSchema = Types.Object({
    description: "Server response",
    properties: {
      status: Types.String({
        description: "Request status",
        example: "success/error",
      }),
      data: Types.Object({
        description: "Returns all characters that featured in a movie",
        properties: {
          characters: Types.Array({
            arrayType: Types.Object({
              properties: {
                  id: Types.Integer(),
                  name: Types.String(),
                  height: Types.String(),
                  mass: Types.String(),
                  hair_color: Types.String(),
                  skin_color: Types.String(),
                  eye_color: Types.String(),
                  birth_year: Types.String(),
                  gender: Types.String()
              },
          }),
          description: "Array of comments"
          }),
          height: Types.String({description: "Returns the total height of all characters in feet and inches."}),
          count: Types.Integer({description: "Total number of characters"}),
        }
      })
    },
  });

  // declare our API
  openApi.addPath(
    "/:id/characters", // this is API path
    {
      // API method
      get: {
        description: "Get Star wars films comments", // Method description
        summary: "Returns a list of comments for a Star war episode.", // Method summary
        operationId: "GetMovieCharacters",
        requestSchema: {
          params: {
            id: Types.Number({
              description: "Film ID",
              required: true, // param values MUST be required
              example: 2,
            }),
          },
          query: {
            sort: Types.String({
              description: "options: {'name', 'height', 'gender'}",
              example: "name"
            }),
            order: Types.String({
              description: "ASC for Ascending or DESC for decending",
              example: "ASC"
            }),
            gender: Types.String({
              example: "male"
            }),
          }
        },
        responses: {
          200: openApi.declareSchema(
            "Get comment success",
            responseSchema
          ),
        },
        tags: ["Star Wars Apis"], // these tags group your methods in UI
      },
    },
    true // make method visible
  );
}