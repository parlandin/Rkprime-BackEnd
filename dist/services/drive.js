"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadFile = void 0;
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
const driveID = '1F_Q_jjqSIyeGS5g2Vz5tQ1ydmOk_vwQa';
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: "./src/services/rkprime.json",
    scopes: ["https://www.googleapis.com/auth/drive"]
});
const driveSerivce = googleapis_1.google.drive({
    version: "v3",
    auth
});
async function uploadFile(req, res, next) {
    var _a;
    try {
        if (!req.file)
            next();
        const image = req.file;
        const fileMetadata = {
            name: image === null || image === void 0 ? void 0 : image.filename,
            parents: [driveID]
        };
        const media = {
            mimeType: image === null || image === void 0 ? void 0 : image.mimetype,
            body: fs_1.default.createReadStream(image === null || image === void 0 ? void 0 : image.path)
        };
        const response = await driveSerivce.files.create({
            resource: fileMetadata,
            media: media,
            fields: "id"
        });
        (_a = req.file) === null || _a === void 0 ? void 0 : _a.imageID = response.data.id;
        next();
    }
    catch (error) {
        console.log(error);
        next();
    }
}
exports.uploadFile = uploadFile;
async function deleteFile(imageID) {
    try {
        const response = await driveSerivce.files.delete({
            fileId: imageID
        });
        return response.status;
    }
    catch (error) {
        console.log(error);
    }
}
exports.deleteFile = deleteFile;
