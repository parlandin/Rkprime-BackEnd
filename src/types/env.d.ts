import { Secret } from "jsonwebtoken";

declare global {
    namespace NodeJS {
        interface ProcessEnv{
            MONGO_CONNECTION: String, 
            MONGO_CONNECTION_LOCAL: String, 
            JWT_TOKEN: Secret, 
            MAIL_USER: String, 
            MAIL_PASS: String
            NODE_ENV: "development" | "production"
        }
    }
}

export {};