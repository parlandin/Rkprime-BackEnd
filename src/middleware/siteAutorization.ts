import {Request, Response, NextFunction} from "express"


export default function siteAutorization(req: Request, res: Response, next: NextFunction){
    const permission = req.headers.referer == "https://rk-prime.vercel.app" ? true : false;
    //if(!permission) return res.status(401).json({message: "authorization invalid"});
    return res.status(200).json({header: req.headers.referer});
}