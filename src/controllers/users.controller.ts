import { NextFunction, Request, Response } from "express";
import UserDB from "../database/models/user.model";
import {hash} from "bcrypt";
import sendEmail from "../services/sendEmail";
import {sign, verify} from "jsonwebtoken";
import authConfig from "../config/auth";

class UsersController {

    public async newUser(req: Request, res: Response){
        const {nome, email, senha, perfil_foto, cargo} = req.body;
        const passwordHash = await hash(senha, 8);

        try {
            const newUser = await UserDB.create({nome, email, senha: passwordHash, perfil_foto, cargo});
            res.status(201).json({newUser});
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
    }

    public async showUsers(req: Request, res: Response){
        try {
            const Users = await UserDB.find({}, '_id nome perfil_foto cargo');
            res.status(200).json(Users);
            
            return;

        }catch (error) {
            console.log(error);
            res.sendStatus(404);
            return;
        }
    }

    public async showUserById(req: Request, res: Response){
        try {
            const { id } = req.params;
            const user = await UserDB.findOne({_id: id}, '_id nome perfil_foto cargo'); 
            res.status(200).json(user);
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }

    public async updateUser(req: Request, res: Response){
        try {
            const { id } = req.params;
            
            const {nome, email, senha, perfil_foto, cargo} = req.body;
            const passwordHash = await hash(senha, 8);
            await UserDB.updateOne({_id: id}, {$set: {nome, email, passwordHash, perfil_foto, cargo}});
            res.sendStatus(200);
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }

    public async forgotPassword(req: Request, res: Response){
        const {email} = req.body;

        try {
            const user = await UserDB.findOne({email: email});

            if(!user){
                res.status(404).json({message: "user not found"})
                return;
            }

            const token = sign({}, authConfig.JWT.secret_key, {
                subject: String(user._id),
                expiresIn: "1h"
            });
            console.log("token: ", token)
            const urlToken = encodeURIComponent(token).replaceAll(".", "[-]");
            
            await UserDB.findByIdAndUpdate(user.id, {
                "$set": {
                    passwordResetToken: urlToken
                }
            });

            await sendEmail(email, urlToken);
            res.status(200).json({message: "ok"})

        } catch(error){
            res.sendStatus(500);
        }
    }

    public async changePassword(req: Request, res: Response){
        const {token, password, confirmPassword} = req.body;
        //const {token} = req.body;
        try {
            const replaceToken = token.replaceAll("[-]", ".");
            const decodeToken = decodeURIComponent(replaceToken);
            const isValidToken = verify(decodeToken, authConfig.JWT.secret_key);
           
            if(!isValidToken){
                res.status(401).json({message: "invalid token"});
                return;
            }

            if(password !== confirmPassword) {
                res.status(401).json({message: "error in forgot password"});
                return;
            }

            const id = isValidToken.sub;
            const user = await UserDB.findById(id, "passwordResetToken");

            if(!user) {
                res.status(401).json({message: "error in forgot password"});
                return;
            }
            
            if(user.passwordResetToken !== token) {
                res.status(401).json({message: "error token invalid"});
                return;
            }

            const passwordHash = await hash(password, 8);

            await UserDB.findByIdAndUpdate(id ,{"$set": {
                senha: passwordHash,
                passwordResetToken: null
            }})
            
            res.sendStatus(200)
        } catch(error){
            console.log(error)
            res.sendStatus(500);
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await UserDB.deleteOne({_id: id});
            res.sendStatus(200);
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    }
}

export default new UsersController();