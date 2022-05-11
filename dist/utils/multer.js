"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
exports.default = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: path_1.default.resolve(__dirname, '../', 'public', 'images'),
        filename(request, file, callback) {
            const hash = crypto_1.default.randomBytes(5).toString("hex");
            const filename = `${hash}-${file.originalname}`;
            callback(null, filename);
        },
    }),
    limits: {
        fileSize: 1024 * 1024
    }
});
