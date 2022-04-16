import express, {Request, Response, NextFunction}  from "express";
import products from "./routes/products.route";
import users from "./routes/users.route";
import Session from "./routes/sessions.route";
import MongoConnection from "./database/MongoConnection";
const app = express()


//porta do servidor
const port = process.env.PORT || 5000;


//Configurações do servidor
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//conectado com o bando de dados
MongoConnection.connect();


//usando as rotas
app.use(Session);
app.use(users);
app.use(products);



//status do servidor
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
})


app.listen(port, (() => {
    console.log(`aplicação online na porta: ${port}`)
}))