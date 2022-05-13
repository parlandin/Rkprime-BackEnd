import {Request, Response, NextFunction} from "express"

export default function siteAutorization(req: Request, res: Response, next: NextFunction){
    const header = req.hostname == "localhost"
    if(!header) return res.status(401).json({message: "authorization invalid"});
    return next();
}