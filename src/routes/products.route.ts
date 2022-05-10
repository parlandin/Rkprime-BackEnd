import { Router}  from "express";
import ProductsController from "../controllers/products.controller";
import isSession from "../middleware/session.middle";
import {uploadFile} from "../services/drive"



import multerConfig from "../utils/multer";

const products = Router();
products.get("/produtos", ProductsController.showProducts);
products.get("/produtos/categorias", ProductsController.showCategorys);
products.get("/produtos/categoria/:Namecategoria", ProductsController.showProductByCategory);
products.get("/produtos/destaques", ProductsController.showProductSpotlight);
products.get("/produtos/:id", ProductsController.showProductById);
products.get("/produtos/like/:tags", ProductsController.showProductLikeTags);


products.use(isSession)
products.post("/produtos", multerConfig.single('images'), ProductsController.newProduct);
products.put("/produtos/:id", ProductsController.updateProduct);
//products.patch("/produtos/:id", ProductsController.newProduct);
products.delete("/produtos/:id", ProductsController.deleteProduct);

export default products;