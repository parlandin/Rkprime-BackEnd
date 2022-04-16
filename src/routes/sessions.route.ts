import { Router}  from "express";
import SessionController from "../controllers/session.controller";


const session = Router();

session.post("/login",SessionController.createSession);

export default session;