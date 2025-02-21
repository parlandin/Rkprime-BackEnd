import mongoose from "mongoose";
import config from "../config/database"
import producs from "./models/product.model"

class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.host);
            console.log("database conectdado");    

           
            
        }catch(error){
            console.error(error);
            process.exit(1);
        } 
    }
}

export default new MongoConnection;