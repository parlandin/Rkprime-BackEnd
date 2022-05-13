"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function siteAutorization(req, res, next) {
    const permission = req.headers.referer == "https://rk-prime.vercel.app" ? true : false;
    return res.status(200).json({ header: req.headers.referer });
}
exports.default = siteAutorization;
