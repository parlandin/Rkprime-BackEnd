import { NextFunction, Request, Response } from "express";
import { productsDB } from "../database/models/product.model";


class ProductsController {

    public async newProduct(req: Request, res: Response, next: NextFunction){
        const {nome, descricao, preco, imagens, categoria, destaque, tags} = req.body;

        const newProduct = await productsDB.create({nome, descricao, preco, imagens, categoria, destaque, tags});

        res.status(200).json({newProduct});
        return;
    }

    public async showProducts(req: Request, res: Response, next: NextFunction){
        const products  = await productsDB.find()
        res.status(200).json(products)
        return;
    }

    public async showProductById(){

    }

    public showCategorys(req: Request, res: Response, next: NextFunction){
        const categorys = ["acessorios", "roupas", "tattos", "acessoriosgeeks", "cospalyers", "mangas"];
        res.status(200).json(categorys);
       
    }

    public async showProductToCategory(req: Request, res: Response, next: NextFunction){
        const {Namecategoria} = req.params;
        const products = await productsDB.find({categoria: Namecategoria});

        res.status(200).json(products);
        return;
    }

    public async showProductSpotlight(req: Request, res: Response, next: NextFunction){
        const products = await productsDB.find({destaque: true});
        res.status(200).json(products);
        return;
    }
}

export default new ProductsController();