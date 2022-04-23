import { Router}  from "express";
import ProductsController from "../controllers/products.controller";
import isSession from "../middleware/session.middle";
import uploadFile from "../services/drive"



import multerConfig from "../utils/multer";

const products = Router();
products.get("/produtos", ProductsController.showProducts);
products.get("/produtos/categorias", ProductsController.showCategorys);
products.get("/produtos/categoria/:Namecategoria", ProductsController.showProductByCategory);
products.get("/produtos/destaques", ProductsController.showProductSpotlight);
products.get("/produtos/:id", ProductsController.showProductById);


products.use(isSession)
products.post("/produtos", multerConfig.single('images'), uploadFile,  ProductsController.newProduct);
products.put("/produtos/:id", ProductsController.updateProduct);
//products.patch("/produtos/:id", ProductsController.newProduct);
products.delete("/produtos/:id", ProductsController.deleteProduct);



products.post("/rotatest",  multerConfig.single('images'), uploadFile, (req, res) => {
    console.log(req.file.imageID)
    res.status(200).json({message: "tudo certo"})
});


export default products;