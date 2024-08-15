import users from "@/models/usermodel";
import {start} from "@/dbconnect/connect";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";


start()

export const sendemail = async ({email,emailtype,id}:any) =>{

    try{
        const token= await bcryptjs.hash(email,10);

        if(emailtype==="VERIFY")
        {
            await users.findByIdAndUpdate(id,{verifyToken:token,verifyTokenExpiry:Date.now()+3600000})
        }
        if(emailtype==="RESET")
        {
            await users.findByIdAndUpdate(id,{forgotPasswordToken:token,forgotPasswordTokenExpiry:Date.now()+3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: process.env.TRANSPORT_USER,
            pass: process.env.TRANSPORT_PASS
            }
        });

        var message = {
            from: "shivamkaushikjan@gmail.com",
            to: email,
            subject: emailtype==="VERIFY" ? "email account verification" : "forgot password",
            text: "this email is to verify your email account entered on our website",
            html: `<p><a href=${process.env.DOMAIN}/verifyemail?token=${token}>Click here</a> to ${emailtype==="VERIFY" ? "verify email" : "reset password"} or copy and paste the link given below in your browser ${process.env.DOMAIN}/verifyemail?token=${token}</p>`,
        };
        
        const mailresponse = await transport.sendMail(message);
        return mailresponse;
    }
    catch(error:any){
        return {error:error.message};
    }
}


