"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = __importDefault(require("../config/database"));
class MongoConnection {
    async connect() {
        try {
            await mongoose_1.default.connect(database_1.default.host);
            console.log("database conectdado");
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}
exports.default = new MongoConnection;
