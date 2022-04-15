import { Router}  from "express";
import ProductsController from "../controllers/products.controller";

const products = Router();

products.get("/produtos", ProductsController.showProducts);
products.get("/produtos/categorias", ProductsController.showCategorys);
products.get("/produtos/categoria/:Namecategoria", ProductsController.showProductByCategory);
products.get("/produtos/destaques", ProductsController.showProductSpotlight);
products.get("/produtos/:id", ProductsController.showProductById);


//
products.post("/produtos", ProductsController.newProduct);
products.put("/produtos/:id", ProductsController.updateProduct);
//products.patch("/produtos/:id", ProductsController.newProduct);
products.delete("/produtos/:id", ProductsController.deleteProduct);


export default products;