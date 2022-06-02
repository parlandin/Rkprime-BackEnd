import { Router}  from "express";
import SessionController from "../controllers/session.controller";
import userController from "../controllers/users.controller";


const session = Router();

session.post("/login",SessionController.createSession);
session.post("/forgotpassword", userController.forgotPassword);
session.post("/changepassword", userController.changePassword);

export default session;