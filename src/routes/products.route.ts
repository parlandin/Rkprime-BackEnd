import { Router}  from "express";
import ProductsController from "../controllers/products.controller";

const products = Router();

products.post("/produtos", ProductsController.newProduct);

products.get("/produtos", ProductsController.showProducts);
products.get("/produtos/:id", ProductsController.showProducts);
products.get("produtos/categorias", ProductsController.showCategorys);
products.get("/produtos/categoria/:Namecategoria", ProductsController.showProductToCategory);
products.get("/produtos/destaques", ProductsController.showProductSpotlight);


export default products;