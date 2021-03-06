import express, { Request, Response} from 'express';
import { sequelizeConnection, InitTables } from "./db/configs";
import cors from 'cors';
import { router } from './routes';
import swaggerUI from "swagger-ui-express";
import { initAddComment, initGetComments,initGetFilms, initGetFilm, initGetMovieCharacters } from './doc/init';
import { initOpenApi, openApiInstance } from './doc/openapi';
import configs =  require('./configs/env');
import { FetchData } from './services/services';


const app = express();
app.use(cors());


// Connect to mysql DB
sequelizeConnection.authenticate()
.then(async ()=>{
  console.log('Connection has been established successfully.');
  InitTables()
})
.catch(error => {
  console.error('Unable to connect to the database:', error);
})


app.use(express.json())

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup());
app.use("/", router)

// declare our hello world api
initGetFilms(app, openApiInstance);
initGetFilm(app, openApiInstance);
initGetMovieCharacters(app, openApiInstance);
initAddComment(app, openApiInstance);
initGetComments(app, openApiInstance);

// initializes schema endpoint and UI
initOpenApi(app, openApiInstance);


app.get('/ping', async (req:Request, res:Response) => {
    
  await FetchData()
    res.status(200).json({"message":'Pong...'});
});


app.all('*', (req:Request, res:Response) => {
    res.status(404).json({"message":'Not Found!'});
});


// // Start Server
app.listen(configs.PORT, () => {
  return console.log(`Express is listening at ${configs.PORT}`);
});
