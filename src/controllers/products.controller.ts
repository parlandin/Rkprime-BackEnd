import { NextFunction, Request, Response } from "express";
import productsDB from "../database/models/product.model";
import {deleteFile} from "../services/drive"


class ProductsController {

    public async newProduct(req: Request, res: Response){   
        //const images = req.files
        
        if(!req.file?.imageID) return res.status(404).json({message: "arquivo não enviado"})

        const images = req.file.imageID
        const dateRequest = JSON.parse(req.body.data)

        const img =[
            images,
            "1rwrR9ZLre2Cz6sUgQsl-OyrsefUxppPt",
            "1nNbQdmbTKkzwLTY0WobeR7AOut69Bvsj", 
            "1lJwEoPpgqj5tzDLyEw4ZQG_SHKXPQWTC"
        ]
           

        try {
            

            const {nome, descricao, preco, categoria, destaque, tags, quantidade} = dateRequest;
            const newProduct = await productsDB.create({nome, descricao, preco, imagens: img, categoria, destaque, tags, quantidade});
            res.status(201).json({message: "produto cadastrado com sucesso"});
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
        
    }

    public async showProducts(req: Request, res: Response){
        try {
            const products = await productsDB.find({}, '_id nome descricao preco imagens categoria quantidade tags');
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
        const categorys = ["acessorios", "roupas", "tattoos", "acessoriosgeeks", "cospalyers", "mangas"];
        res.status(200).json(categorys);
       
    }

    public async showProductByCategory(req: Request, res: Response){
        try {
            const {Namecategoria} = req.params;
            const products = await productsDB.find({categoria: Namecategoria});

            if(products.length == 0) return res.status(404).json({message: "essa categoria não existe"});

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
        const { id } = req.params;
        try {

            const {imagens} = await productsDB.findOne({_id: id}, 'imagens');


            if(imagens !== null || imagens.length > 0 ){
                //for(let file of imagens){
                    await deleteFile(imagens[0]);
                    
                }
           
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