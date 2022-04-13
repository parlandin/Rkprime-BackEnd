import mongoose from "mongoose";
import 'dotenv/config';

class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGO_CONNECTION);
            console.log("database conectdado");
            
        }catch(error){
            console.error(error);
            process.exit(1);
        } 
    }
}

export default new MongoConnection;