import {Request, Response, NextFunction} from "express"


export default function siteAutorization(req: Request, res: Response, next: NextFunction){
    const permission = req.hostname == "https://rk-prime.vercel.app" || req.hostname == "rk-prime.vercel.app" ? true : false;
   
    if(!permission) return res.status(401).json({message: "authorization invalid"});
    return next();
}