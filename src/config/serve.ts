import "dotenv/config"

export default {
     PORT: process.env.PORT || 5000,
     FRONTEND_URL: process.env.FRONT_URL || 'http://localhost:3000',
}