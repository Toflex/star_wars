"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGetMovieCharacters = exports.initAddComment = exports.initGetComments = exports.initGetFilms = void 0;
const ts_openapi_1 = require("ts-openapi");
const controller_1 = require("../controllers/controller");
// body response schema
const genericResponseSchema = ts_openapi_1.Types.Object({
    description: "Server response",
    properties: {
        status: ts_openapi_1.Types.String({
            description: "Request status",
            example: "success/error",
        }),
        message: ts_openapi_1.Types.String({
            description: "Response message from the server",
            maxLength: 100,
            required: true,
        }),
    },
});
function initGetFilms(app, openApi) {
    app.get("/", controller_1.GetFilms);
    // body response schema
    const responseSchema = ts_openapi_1.Types.Object({
        description: "Server response",
        properties: {
            status: ts_openapi_1.Types.String({
                description: "Request status",
                example: "success/error",
            }),
            data: ts_openapi_1.Types.Object({
                description: "Returns all movies",
                properties: {
                    results: ts_openapi_1.Types.Array({
                        arrayType: ts_openapi_1.Types.Object({
                            properties: {
                                title: ts_openapi_1.Types.String(),
                                episode_id: ts_openapi_1.Types.Integer(),
                                opening_crawl: ts_openapi_1.Types.String(),
                                character_count: ts_openapi_1.Types.Integer(),
                                characters_url: ts_openapi_1.Types.String(),
                                comments: ts_openapi_1.Types.String(),
                                comment_count: ts_openapi_1.Types.Integer(),
                                director: ts_openapi_1.Types.String(),
                                producer: ts_openapi_1.Types.String(),
                                release_date: ts_openapi_1.Types.Date(),
                            },
                        }),
                        description: "Array of movies"
                    }),
                }
            })
        },
    });
    // declare our API
    openApi.addPath("/", // this is API path
    {
        // API method
        get: {
            description: "Get Star wars films episodes",
            summary: "Returns a list of Star war episode along with their characters.",
            operationId: "GetFilms",
            responses: {
                // here we declare the response types
                200: openApi.declareSchema("Get movie list success", responseSchema),
            },
            tags: ["Star Wars Apis"], // these tags group your methods in UI
        },
    }, true // make method visible
    );
}
exports.initGetFilms = initGetFilms;
function initGetComments(app, openApi) {
    app.get("/:id/comments", controller_1.GetComments);
    // body response schema
    const responseSchema = ts_openapi_1.Types.Object({
        description: "Server response",
        properties: {
            status: ts_openapi_1.Types.String({
                description: "Request status",
                example: "success/error",
            }),
            message: ts_openapi_1.Types.String({
                description: "Response message from the server",
            }),
            data: ts_openapi_1.Types.Object({
                description: "Returns all comments associated with a movie",
                properties: {
                    results: ts_openapi_1.Types.Array({
                        arrayType: ts_openapi_1.Types.Object({
                            properties: {
                                id: ts_openapi_1.Types.Integer(),
                                episode_id: ts_openapi_1.Types.Integer(),
                                author_name: ts_openapi_1.Types.String(),
                                message: ts_openapi_1.Types.String(),
                                created: ts_openapi_1.Types.String(),
                            },
                        }),
                        description: "Array of comments"
                    }),
                    next: ts_openapi_1.Types.String({ description: "link to next page" }),
                    count: ts_openapi_1.Types.Integer({ description: "Total number of comments" }),
                }
            })
        },
    });
    // declare our API
    openApi.addPath("/:id/comments", // this is API path
    {
        // API method
        get: {
            description: "Get Star wars films comments",
            summary: "Returns a list of comments for a Star war episode.",
            operationId: "GetComments",
            requestSchema: {
                params: {
                    id: ts_openapi_1.Types.Number({
                        description: "Film ID",
                        required: true,
                        example: 2,
                    }),
                },
            },
            responses: {
                200: openApi.declareSchema("Get comment success", responseSchema),
            },
            tags: ["Star Wars Apis"], // these tags group your methods in UI
        },
    }, true // make method visible
    );
}
exports.initGetComments = initGetComments;
function initAddComment(app, openApi) {
    app.post("/:id/comments", controller_1.AddComment);
    const commonProperties = {
        message: ts_openapi_1.Types.String({
            description: "Comment messsage",
            maxLength: 500,
            required: true,
        }),
        author: ts_openapi_1.Types.String({
            description: "Comment author",
            required: false,
        }),
    };
    // declare our API
    openApi.addPath("/:id/comments", // this is API path
    {
        // API method
        post: {
            description: "Add comment to a Star wars film.",
            summary: "Add comment to a Star wars film.",
            operationId: "AddComment",
            requestSchema: {
                body: ts_openapi_1.Types.Object({
                    description: "Add comment to a start war episode.",
                    properties: commonProperties,
                }),
                params: {
                    id: ts_openapi_1.Types.Number({
                        description: "Film ID",
                        required: true,
                        example: 2,
                    }),
                },
            },
            responses: {
                // here we declare the response types
                201: openApi.declareSchema("Get comment success", genericResponseSchema),
                400: openApi.declareSchema("Get comment failure message", genericResponseSchema),
            },
            tags: ["Star Wars Apis"], // these tags group your methods in UI
        },
    }, true // make method visible
    );
}
exports.initAddComment = initAddComment;
function initGetMovieCharacters(app, openApi) {
    app.get("/:id/characters", controller_1.GetMovieCharacters);
    // body response schema
    const responseSchema = ts_openapi_1.Types.Object({
        description: "Server response",
        properties: {
            status: ts_openapi_1.Types.String({
                description: "Request status",
                example: "success/error",
            }),
            data: ts_openapi_1.Types.Object({
                description: "Returns all characters that featured in a movie",
                properties: {
                    characters: ts_openapi_1.Types.Array({
                        arrayType: ts_openapi_1.Types.Object({
                            properties: {
                                id: ts_openapi_1.Types.Integer(),
                                name: ts_openapi_1.Types.String(),
                                height: ts_openapi_1.Types.String(),
                                mass: ts_openapi_1.Types.String(),
                                hair_color: ts_openapi_1.Types.String(),
                                skin_color: ts_openapi_1.Types.String(),
                                eye_color: ts_openapi_1.Types.String(),
                                birth_year: ts_openapi_1.Types.String(),
                                gender: ts_openapi_1.Types.String()
                            },
                        }),
                        description: "Array of comments"
                    }),
                    height: ts_openapi_1.Types.String({ description: "Returns the total height of all characters in feet and inches." }),
                    count: ts_openapi_1.Types.Integer({ description: "Total number of characters" }),
                }
            })
        },
    });
    // declare our API
    openApi.addPath("/:id/characters", // this is API path
    {
        // API method
        get: {
            description: "Get Star wars films comments",
            summary: "Returns a list of comments for a Star war episode.",
            operationId: "GetMovieCharacters",
            requestSchema: {
                params: {
                    id: ts_openapi_1.Types.Number({
                        description: "Film ID",
                        required: true,
                        example: 2,
                    }),
                },
                query: {
                    sort: ts_openapi_1.Types.String({
                        description: "options: {'name', 'height', 'gender'}",
                        example: "name"
                    }),
                    order: ts_openapi_1.Types.String({
                        description: "ASC for Ascending or DESC for decending",
                        example: "ASC"
                    }),
                    gender: ts_openapi_1.Types.String({
                        example: "male"
                    }),
                }
            },
            responses: {
                200: openApi.declareSchema("Get comment success", responseSchema),
            },
            tags: ["Star Wars Apis"], // these tags group your methods in UI
        },
    }, true // make method visible
    );
}
exports.initGetMovieCharacters = initGetMovieCharacters;
//# sourceMappingURL=init.js.map