import mailConfing from "../config/mailConfing";
import nodemailer from "nodemailer";
import  hbs from "nodemailer-express-handlebars";
import path from "path"


const {host, port, user, pass} = mailConfing;
const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass
    }
});

transport.use("compile", hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail/')
      },
      viewPath: path.resolve('./src/resources/mail/'),
      extName: '.html',
}));


export default transport;