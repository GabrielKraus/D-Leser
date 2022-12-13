import {createTransport} from 'nodemailer';
import logger from '../../loggers/logger.js';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env' });

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD
    }
});

const gmailOptions = (emailSubject, htmlTemplate) => {
    return {
        from: process.env.GMAIL_ACCOUNT,
        to: ["someAccount@gmail.com"],
        subject: emailSubject,
        html: htmlTemplate
    }
}

const nuevoTemplate = (id, date) => {
    return `
    <h3>Nuevo Usuario</h3>
    <ul>
        <li>Id: ${id}</li>
        <li>FECHA: ${date}</li>
    </ul>
    `
};

export async function sendGmail(subject, htmlTemplate) {
    try {
        const mailOptions = gmailOptions(
            subject,
            htmlTemplate
        );
        
        await transporter.sendMail(mailOptions);
        logger.info(`Email enviado`)
    } catch (error) {
        logger.error(error);
    }
}

