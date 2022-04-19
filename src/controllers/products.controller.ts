import { NextFunction, Request, Response } from "express";
import productsDB from "../database/models/product.model";
/* import { v2 as cloudinary } from 'cloudinary' */
const {cloudinary} = require("../utils/cloudinary");


class ProductsController {

    public async newProduct(req: Request, res: Response){   
        //const images = req.files
        const images = req.file.path
        const dateRequest = JSON.parse(req.body.data)

        const img =[
            {
                imageID: "products/sclx64gdudvnz9yxxks8",
                imageURL: "https://res.cloudinary.com/rkprime/image/upload/v1650228205/products/sclx64gdudvnz9yxxks8.jpg"
            },
            {
                imageID: "products/vluqxvliesapxxluwkx0",
                imageURL: "https://res.cloudinary.com/rkprime/image/upload/v1650228204/products/vluqxvliesapxxluwkx0.jpg"
            },
            {
                imageID: "products/ydhakndxat6gxofpzznc",
                imageURL: "https://res.cloudinary.com/rkprime/image/upload/v1650228206/products/ydhakndxat6gxofpzznc.jpg"
            }]

        try {
            //let imagesOptions = [];
            /*if(images){
                for(let file of images){
                    const upload = await cloudinary.uploader.upload(file.path,{folder: "products"});
                    imagesOptions.push({imageID: upload.public_id, imageURL: upload.secure_url});
                } 
            } */
            const upload = await cloudinary.uploader.upload(images,{folder: "products"});
            const imagesOptions = [{imageID: upload.public_id, imageURL: upload.secure_url}, ...img];

            const {nome, descricao, preco, categoria, destaque, tags, quantidade} = dateRequest;
            const newProduct = await productsDB.create({nome, descricao, preco, imagens: imagesOptions, categoria, destaque, tags, quantidade});
            res.status(201).json({message: "produto cadastrado com sucesso"});
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
        
    }

    public async showProducts(req: Request, res: Response){
        try {
            const products = await productsDB.find({}, '_id nome descricao preco imagens.imageURL categoria quantidade tags');
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

            const {imagens} = await productsDB.findOne({_id: id}, 'imagens.imageID');


            if(imagens !== null || imagens.length > 0 ){
                for(let file of imagens){
                    await cloudinary.uploader.destroy(file.imageID);
                }
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