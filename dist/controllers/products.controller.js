"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../database/models/product.model"));
const drive_1 = require("../services/drive");
class ProductsController {
    async newProduct(req, res) {
        if (!req.file)
            return res.status(404).json({ message: "arquivo não enviado" });
        const image = req.file.filename;
        const dateRequest = JSON.parse(req.body.data);
        const img = [
            `http://localhost:5000/images/${image}`,
            "http://localhost:5000/images/402c204efe-meramente ilustrativo.jpg",
            "http://localhost:5000/images/02d24881c1-meramente ilustrativo2.jpg",
            "http://localhost:5000/images/6c97e1ef27-Sem Título-1.jpg"
        ];
        try {
            const { nome, descricao, preco, categoria, destaque, tags, quantidade } = dateRequest;
            const newProduct = await product_model_1.default.create({ nome, descricao, preco, imagens: img, categoria, destaque, tags, quantidade });
            res.status(201).json({ message: "produto cadastrado com sucesso" });
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
    }
    async showProducts(req, res) {
        try {
            const products = await product_model_1.default.find({ em_breve: false }, '_id nome descricao preco imagens categoria quantidade tags destaque');
            res.status(200).json(products);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(404);
            return;
        }
    }
    async showProductById(req, res) {
        try {
            const { id } = req.params;
            const products = await product_model_1.default.findOne({ _id: id });
            res.status(200).json(products);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
    showCategorys(req, res) {
        const categorys = ["acessorios", "roupas", "tattoos"];
        res.status(200).json(categorys);
    }
    async showProductByCategory(req, res) {
        try {
            const { Namecategoria } = req.params;
            const products = await product_model_1.default.find({ categoria: Namecategoria });
            if (products.length == 0)
                return res.status(404).json({ message: "essa categoria não existe" });
            res.status(200).json(products);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
    async showProductSpotlight(req, res) {
        try {
            const products = await product_model_1.default.find({ destaque: true });
            res.status(200).json(products);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
    async showProductLikeTags(req, res) {
        try {
            const { tags } = req.params;
            const [tag, urlTags] = tags.split('=');
            const arrayTags = urlTags.slice(0, urlTags.length).split(",");
            const products = await product_model_1.default.find({ tags: { $in: arrayTags } }).limit(8);
            if (products.length == 0)
                return res.status(404).json({ message: "sem resultado" });
            res.status(200).json(products);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, preco, imagens, categoria, destaque, tags, quantidade } = req.body;
            await product_model_1.default.updateOne({ _id: id }, { $set: { nome, descricao, preco, imagens, categoria, destaque, tags, quantidade } });
            res.sendStatus(200);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const { imagens } = await product_model_1.default.findOne({ _id: id }, 'imagens');
            if (imagens !== null || imagens.length > 0) {
                await (0, drive_1.deleteFile)(imagens[0]);
            }
            await product_model_1.default.deleteOne({ _id: id });
            res.sendStatus(200);
            return;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
}
exports.default = new ProductsController();
