import { NextFunction, Request,  Response } from "express";
import { google } from "googleapis";
import fs from "fs"



const driveID = '1F_Q_jjqSIyeGS5g2Vz5tQ1ydmOk_vwQa'

const auth = new google.auth.GoogleAuth({
    keyFile: "./src/services/rkprime.json",
    scopes: ["https://www.googleapis.com/auth/drive"]
});

const driveSerivce = google.drive({
    version: "v3",
    auth
});

async function uploadFile(req: Request, res: Response, next: NextFunction){
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

        // "https://drive.google.com/uc?export=view&id="
        
        req.file?.imageID = response.data.id
        next()

    } catch (error) {
        console.log(error);
        next()
    }

}

export default uploadFile; 