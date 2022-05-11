"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    host: process.env.MONGO_CONNECTION,
    hostlocal: process.env.MONGO_CONNECTION_LOCAL,
};
