"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    JWT: {
        secret_key: process.env.JWT_TOKEN,
        expiresIn: "7d"
    }
};
