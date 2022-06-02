import mailer from "../utils/nodemail";

async function sendEmail(email: string, token: string): Promise<string>{
    await mailer.sendMail({
        to: email,
        from: "exemplo@gmail.com",
        subject: "Recuperanção de senha",
        template: "auth/forgot_password",
        context: {token, name: "parlandim"}
    }, (error) => {
        if(error){
            return "error"
        }
        
    })

    return "ok"
}

export default sendEmail;