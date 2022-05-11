"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status = (0, express_1.Router)();
status.get("/", (req, res, next) => {
    res.sendStatus(200);
});
exports.default = status;
