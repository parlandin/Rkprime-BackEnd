import { NextFunction, Request, Response } from "express";
import UserDB from "../database/models/user.model";
import {hash} from "bcrypt";
import crypto from "crypto";
import sendEmail from "../services/sendEmail";

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
            await UserDB.updateOne({_id: id}, {$set: {nome, email, senha, perfil_foto, cargo}});
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

            const token = crypto.randomBytes(20).toString("hex");
            const timeExpires = new Date();
            timeExpires.setHours(timeExpires.getHours() + 1);

            await UserDB.findByIdAndUpdate(user.id, {
                "$set": {
                    passwordResetToken: token,
                    passwordResetExpires: timeExpires
                }
            });
            await sendEmail(email, token)
            res.status(200).json({message: "ok"})

        } catch(error){
            res.sendStatus(500);
        }
    }

    public async changePassword(req: Request, res: Response){
        const {token, password, confirmPassword} = req.body;
        try {

        } catch(error){
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