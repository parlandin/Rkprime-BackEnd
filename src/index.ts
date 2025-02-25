import express, {Request, Response, NextFunction}  from "express";
import products from "./routes/products.route";
import users from "./routes/users.route";
import Session from "./routes/sessions.route";
import status from "./routes/status.route";
import MongoConnection from "./database/MongoConnection";
import cors from 'cors';
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/serve";



const app = express();



//Configurações do servidor
app.use(helmet());
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


//conectado com o bando de dados
MongoConnection.connect();


//usando as rotas
app.use(status)
app.use(express.static(path.resolve(__dirname + '/public')));
app.use(Session);
app.use(products);
app.use(users);


//iniciando o servidor
app.listen(config.PORT, (() => {
    console.log(`aplicação online na porta: ${config.PORT}`)
   
}))