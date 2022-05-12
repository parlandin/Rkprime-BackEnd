"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function siteAutorization(req, res, next) {
    const permission = req.headers.referer == "https://rk-prime.vercel.app" ? true : false;
    if (!permission)
        return res.status(401).json({ message: "authorization invalid" });
    return next();
}
exports.default = siteAutorization;
