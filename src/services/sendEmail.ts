import mailer from "../utils/nodemail";

async function sendEmail(email: string, token: string){
    await mailer.sendMail({
        to: email,
        from: "exemplo@gmail.com",
        template: "auth/forgot_password",
        context: {token}
    }, (error) => {
        if(error){
            return "error"
        }
        
    })

    return "ok"
}

export default sendEmail;