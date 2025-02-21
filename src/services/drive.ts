import { NextFunction, Request,  response,  Response } from "express";
import file from 'multer'
import { google } from "googleapis";
import fs from "fs"


const driveID = ''

const auth = new google.auth.GoogleAuth({
    keyFile: "./src/services/rkprime.json",
    scopes: ["https://www.googleapis.com/auth/drive"]
});

const driveSerivce = google.drive({
    version: "v3",
    auth
});



export async function uploadFile(req: Request, res: Response, next: NextFunction){
    try {
        if (!req.file) next()

        const image = req.file 

        const fileMetadata = {
            name: image?.filename,
            parents: [driveID]
        };

        const media = {
            mimeType: image?.mimetype,
            body: fs.createReadStream(image?.path)
        };

        const response = await driveSerivce.files.create({
            resource: fileMetadata,
            media: media,
            fields: "id"
        })

       
        
        req.file?.imageID  = response.data.id
        next()

    } catch (error) {
        console.log(error);
        next()
    }
}


export async function deleteFile(imageID:string) {
    try{
        const response = await driveSerivce.files.delete({
            fileId: imageID
        });
        return response.status;

    }
    catch(error){
        console.log(error)
    }
}

