import express, {Request, Response, NextFunction}  from "express";
import products from "./routes/products.route";
import users from "./routes/users.route";
import Session from "./routes/sessions.route";
import status from "./routes/status.route";
import checked from "./routes/checked.route";
import MongoConnection from "./database/MongoConnection";
import cors from 'cors';
import path from "path";
import helmet from "helmet";
import morgan from "morgan";


const app = express();

//porta do servidor
const port = process.env.PORT || 5000;


//Configurações do servidor
app.use(helmet());
app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



//conectado com o bando de dados
MongoConnection.connect();


//usando as rotas
app.use(express.static(path.resolve(__dirname + '/public')));
app.use(status);
app.use(checked);
app.use(Session);
app.use(products);
app.use(users);




//iniciando o servidor
app.listen(port, (() => {
    console.log(`aplicação online na porta: ${port}`)
}))