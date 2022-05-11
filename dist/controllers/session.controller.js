"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = __importDefault(require("../database/models/user.model"));
const auth_1 = __importDefault(require("../config/auth"));
class Session {
    async createSession(req, res) {
        const { email, senha } = req.body;
        try {
            const user = await user_model_1.default.findOne({ email: email });
            if (!user)
                return res.status(404).json({ message: "login incorreto" });
            const isValidpass = await (0, bcrypt_1.compare)(senha, user === null || user === void 0 ? void 0 : user.senha);
            if (!isValidpass) {
                return res.status(404).json({ message: "login incorreto" });
            }
            const token = (0, jsonwebtoken_1.sign)({}, auth_1.default.JWT.secret_key, {
                subject: String(user._id),
                expiresIn: auth_1.default.JWT.expiresIn
            });
            const { _id, nome, perfil_foto, cargo } = user;
            return res.status(200).json({ _id, nome, perfil_foto, cargo, token });
        }
        catch (error) {
            console.log(error);
            return res.status(404).json({ message: "login incorreto" });
        }
    }
}
exports.default = new Session();
