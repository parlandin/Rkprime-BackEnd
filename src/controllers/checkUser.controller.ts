import {Request, Response, NextFunction} from "express"
import {verify} from "jsonwebtoken"
import AuthConfig from "../config/auth"

export default function checkUserController(req: Request, res: Response){
    const {token} = req.body;
   
    if(!token) return res.status(401).json({message: "authorization invalid"});

    try {
        const decodeToken = verify(token, AuthConfig.JWT.secret_key);
        if(decodeToken) {
            res.status(200).json({message: "isValid"})
        }
    } catch (error){
        console.log(error)
        return res.sendStatus(404)
    } 
}