import { NextFunction, Request, Response } from "express";
import productsDB from "../database/models/product.model";
import {deleteFile} from "../services/drive"


class ProductsController {

    public async newProduct(req: Request, res: Response){ 
        if(!req.file) return res.status(404).json({message: "arquivo não enviado"})

        const image = req.file.filename
        const dateRequest = JSON.parse(req.body.data)

        const img = [
            `http://localhost:5000/images/${image}`,
            "http://localhost:5000/images/402c204efe-meramente ilustrativo.jpg",
            "http://localhost:5000/images/02d24881c1-meramente ilustrativo2.jpg",
            "http://localhost:5000/images/6c97e1ef27-Sem Título-1.jpg"
        ]
           

        try {
            

            const {nome, descricao, preco, categoria, destaque, tags, quantidade, nota} = dateRequest;
            const newProduct = await productsDB.create({nome, descricao, preco, imagens: img, categoria, destaque, tags, quantidade, nota});
            res.status(201).json({message: "produto cadastrado com sucesso"});
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
        
    }

    public async showProducts(req: Request, res: Response){
        try {
            const products = await productsDB.find({em_breve: false}, '_id nome descricao preco imagens categoria quantidade tags destaque nota');
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
        const categorys = ["acessorios", "roupas", "tattoos"];
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

    public async showProductLikeTags(req: Request, res: Response){
        try {
            const {tags} = req.params;
            const [tag, urlTags] = tags.split('=');
            const arrayTags =  urlTags.slice(0, urlTags.length ).split(",");
            const products = await productsDB.find({tags: {$in: arrayTags}}).limit(8);

            if(products.length == 0) return res.status(404).json({message: "sem resultado"});

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