import express, {Request, Response, NextFunction}  from "express";
import products from "./routes/products.route";
import users from "./routes/users.route";
import Session from "./routes/sessions.route";
import MongoConnection from "./database/MongoConnection";
import cors from 'cors';
//import routeImages from "./routes/images.route";


const app = express();

//porta do servidor
const port = process.env.PORT || 5000;


//Configurações do servidor
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


//conectado com o bando de dados
MongoConnection.connect();


//usando as rotas
app.use(express.static(__dirname + '/public'));
app.use(Session);
app.use(products);
app.use(users);




//status do servidor
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
})


app.listen(port, (() => {
    console.log(`aplicação online na porta: ${port}`)
}))