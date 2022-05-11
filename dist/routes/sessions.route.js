"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = __importDefault(require("../controllers/session.controller"));
const session = (0, express_1.Router)();
session.post("/login", session_controller_1.default.createSession);
exports.default = session;
