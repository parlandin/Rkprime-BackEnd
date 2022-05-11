"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const session_middle_1 = __importDefault(require("../middleware/session.middle"));
const userRouter = (0, express_1.Router)();
userRouter.use(session_middle_1.default);
userRouter.get("/users", users_controller_1.default.showUsers);
userRouter.get("/users/:id", users_controller_1.default.showUserById);
userRouter.post("/users", users_controller_1.default.newUser);
userRouter.put("/users/:id", users_controller_1.default.updateUser);
userRouter.delete("/users/:id", users_controller_1.default.deleteUser);
exports.default = userRouter;
