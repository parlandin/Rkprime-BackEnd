"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
function isSession(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ message: "authorization invalid" });
    const [type, token] = header.split(" ");
    try {
        if (type !== "Bearer")
            return res.status(401).json({ message: "authorization invalid" });
        const decodeToken = (0, jsonwebtoken_1.verify)(token, auth_1.default.JWT.secret_key);
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}
exports.default = isSession;
