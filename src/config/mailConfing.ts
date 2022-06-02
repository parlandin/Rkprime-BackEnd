import 'dotenv/config';

export default {
    host: "smtp.mailtrap.io",
    port: 2525,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS ,
}