"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    imagens: {
        type: Array,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    destaque: {
        type: Boolean,
        required: false
    },
    quantidade: {
        type: Number,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    cloudinary_id: String
});
exports.default = (0, mongoose_1.model)('Produtos', ProductSchema);
