import { Router}  from "express";
import checkUserController from '../controllers/checkUser.controller';

const checkedRoute = Router();

checkedRoute.post("/user/checked", checkUserController);


export default checkedRoute;