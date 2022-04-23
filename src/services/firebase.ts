import { Request, Response, NextFunction } from 'express';
import "dotenv/config";
import { credential } from 'firebase-admin';
import crypto from "crypto";
import configJSON from "../../prime.json"
const  admin = require("firebase-admin");


const BUCKET = 'rk-prime.appspot.com'

admin.initializeApp({
    credential:  credential.cert(configJSON),
    storageBucket: BUCKET
});



const bucket = admin.storage().bucket();

function updateImage(req: Request, res: Response, next: NextFunction){
    if(!req.file) return res.status(404).json({message: "not fould file"});

    const image = req.file;
    const hash = crypto.randomBytes(4).toString("hex");
    const ImageName = `${hash}.${image.originalname}`;

    const file = bucket.file("produtos/" + ImageName);

    const stream = file.createWriteStream({
        metadata: {
            contentType:image.mimetype,
        }
    });

    stream.on("error", (error) => console.log(error));

    stream.on("finish", async () => {
        const response = await file.makePublic();
        const {selfLink: imageURL} = response[0];
        //console.log('res:', response[0])
        req.file.firebaseURL = imageURL;

        next();

    });

    stream.end(image.buffer)
}

export default updateImage;

