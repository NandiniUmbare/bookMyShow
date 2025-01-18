const nodemailer = require('nodemailer')
const fs = require('fs')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const {SENDGRID_API_KEY} = process.env

function replaceContent(content, creds){
    const allKeysArr = Object.keys(creds);
    allKeysArr.forEach((key)=>{
        content = content.replace(`#{${key}}`, creds[key]);
    });
    return content;
}

async function EmailHelper(templateName, receiverEmail, creds){
    try {
        const templatePath = path.join(__dirname, "email_templates", templateName);
        const content = await fs.promises.readFile(templatePath, "utf-8");
        const emailDetails = {
            to: receiverEmail,
            from: "nandiniumbare96@gmail.com",
            subject: "Mail from bookMyShow",
            text: `Hi ${creds.name}, This is  your reset otp ${creds.otp}`,
            html: replaceContent(content, creds)
        };
        const transportDetails = {
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: false,
            auth: { 
                user: "nandiniumbare96@gmail.com",
                pass: 'gvev efkr svfb nvck'
            }
        };
        const transporter = nodemailer.createTransport(transportDetails);
        await transporter.sendMail(emailDetails) 
    } catch (error) {
        console.log(error)
    }
}

module.exports = EmailHelper;