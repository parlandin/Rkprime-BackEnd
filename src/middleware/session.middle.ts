import {Request, Response, NextFunction} from "express"
import {verify} from "jsonwebtoken"
import AuthConfig from "../config/auth"

export default function isSession(req: Request, res: Response, next: NextFunction){
    const header = req.headers.authorization;

    if(!header) return res.status(404).json({message: "authorization invalid"});

    const [type, token] = header.split(" ");
    try {
        if(type !== "Bearer") return res.status(404).json({message: "authorization invalid"});

        const decodeToken = verify(token, AuthConfig.JWT.secret_key);

        return next();

    } catch (error){
        console.log(error)
        return res.sendStatus(404)
    } 
}