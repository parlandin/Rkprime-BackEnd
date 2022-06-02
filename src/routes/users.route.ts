import { Router}  from "express";
import UsersController from "../controllers/users.controller";
import isSession from "../middleware/session.middle";

const userRouter = Router();
userRouter.use(isSession)

userRouter.get("/users", UsersController.showUsers);
userRouter.get("/users/:id", UsersController.showUserById);

userRouter.post("/users", UsersController.newUser);
userRouter.put("/users/:id", UsersController.updateUser);
//userRouter.patch("/produtos/:id", userRouterController.newProduct);
userRouter.delete("/users/:id", UsersController.deleteUser); 

export default userRouter;