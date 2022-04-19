import 'dotenv/config';

export default {
    host: process.env.MONGO_CONNECTION,
    hostlocal: process.env.MONGO_CONNECTION_LOCAL,
}