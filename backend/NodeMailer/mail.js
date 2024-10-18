const nodemailer = require('nodemailer');

const sendMail = async (to,subject,html) => {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, 
        secure: true, 
        auth: {
            user: 'teamtipease@gmail.com',
            pass: 'vrwpmaucolxhywkg' 
        }
    });
    await transport.sendMail({
        from: 'teamtipease@gmail.com',
        to: to,
        subject: subject,
        html: html
    });
};
module.exports = { sendMail };
