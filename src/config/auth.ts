import "dotenv/config"

export default {
    JWT: {
        secret_key: process.env.JWT_TOKEN,
        expiresIn: "7d"
    }
}