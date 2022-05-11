"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    perfil_foto: {
        type: String,
        required: false
    },
    cargo: {
        type: String,
        required: false
    }
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
