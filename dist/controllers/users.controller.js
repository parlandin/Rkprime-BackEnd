"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../database/models/user.model"));
const bcrypt_1 = require("bcrypt");
class UsersController {
    async newUser(req, res) {
        const { nome, email, senha, perfil_foto, cargo } = req.body;
        const passwordHash = await (0, bcrypt_1.hash)(senha, 8);
        try {
            const newUser = await user_model_1.default.create({ nome, email, senha: passwordHash, perfil_foto, cargo });
            res.status(201).json({ newUser });
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
    }
    async showUsers(req, res) {
        try {
            const Users = await user_model_1.default.find({}, '_id nome perfil_foto cargo');
            res.status(200).json(Users);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(404);
            return;
        }
    }
    async showUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await user_model_1.default.findOne({ _id: id }, '_id nome perfil_foto cargo');
            res.status(200).json(user);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha, perfil_foto, cargo } = req.body;
            await user_model_1.default.updateOne({ _id: id }, { $set: { nome, email, senha, perfil_foto, cargo } });
            res.sendStatus(200);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await user_model_1.default.deleteOne({ _id: id });
            res.sendStatus(200);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
}
exports.default = new UsersController();
