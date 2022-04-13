import { Router, NextFunction, Request, Response }  from "express";

const products = Router();

products.get("/produtos", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({oK: true})
})


export default products;