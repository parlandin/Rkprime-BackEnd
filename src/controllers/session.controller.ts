import {compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import {Request, Response} from "express"
import UserDB from "../database/models/user.model";
import AuthConfig from "../config/auth";

class Session {
    public async createSession(req: Request, res: Response){
        const {email, senha} = req.body;
        try {
            const user = await  UserDB.findOne({email: email});

            if(!user) return res.status(404).json({message: "login incorreto"});

            const isValidpass = await compare (senha, user?.senha);

            if(!isValidpass){
                return res.status(404).json({message: "login incorreto"});
            }
            
            const token = sign({}, AuthConfig.JWT.secret_key , {
                subject: String(user._id),
                expiresIn: AuthConfig.JWT.expiresIn
            })
            const {_id, nome, perfil_foto, cargo} = user;
            return res.status(200).json({_id, nome, perfil_foto, cargo, token});


        } catch (error) {
            console.log(error)
            return res.status(404).json({message: "login incorreto"});
        }
        


    }
}


export default new Session();