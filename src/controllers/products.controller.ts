import { NextFunction, Request, Response } from "express";
import productsDB from "../database/models/product.model"; 


class ProductsController {

    public async newProduct(req: Request, res: Response){
        try {
            const {nome, descricao, preco, imagens, categoria, destaque, tags, quantidade} = req.body;
            const newProduct = await productsDB.create({nome, descricao, preco, imagens, categoria, destaque, tags, quantidade});
            res.status(201).json({newProduct});
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
        
    }

    public async showProducts(req: Request, res: Response){
        try {
            const products = await productsDB.find();
            res.status(200).json(products);
            return;

        }catch (error) {
            console.log(error);
            res.sendStatus(404);
            return;
        }
       
    }

    public async showProductById(req: Request, res: Response){
        try {
            const { id } = req.params;
            const products = await productsDB.findOne({_id: id}); 
            res.status(200).json(products);
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        
    }

    public showCategorys(req: Request, res: Response){
        const categorys = ["acessorios", "roupas", "tattos", "acessoriosgeeks", "cospalyers", "mangas"];
        res.status(200).json(categorys);
       
    }

    public async showProductByCategory(req: Request, res: Response){
        try {
            const {Namecategoria} = req.params;
            const products = await productsDB.find({categoria: Namecategoria});
            res.status(200).json(products);
            return;

        }catch (error){
            console.log(error);
            res.sendStatus(500);
            return;
        }
       
    }

    public async showProductSpotlight(req: Request, res: Response){
        try {
            const products = await productsDB.find({destaque: true});
            res.status(200).json(products);
            return;
        }catch (error){
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }

    public async updateProduct(req: Request, res: Response){
        try {
            const { id } = req.params;
            const {nome, descricao, preco, imagens, categoria, destaque, tags , quantidade} = req.body;
            await productsDB.updateOne({_id: id}, {$set: {nome, descricao, preco, imagens, categoria, destaque, tags, quantidade}}); 
            res.sendStatus(200);
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }

    public async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await productsDB.deleteOne({_id: id});
            res.sendStatus(200);
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
}

export default new ProductsController();