const nodemailer = require('nodemailer');

const pass = process.env.ERHREAL_EMAIL_PASS;

const mail = async (email, message) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'sadie.friesen36@ethereal.email',
            pass,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Task management system" <sadie.friesen36@ethereal.email>',
        to: email,
        subject: 'Important message',
        text: message,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = mail;
