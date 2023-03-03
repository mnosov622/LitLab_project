const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

//send email

// create reusable transporter object using the default SMTP transport

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'mnosov622@gmail.com',
            pass: 'ywrvaepvdteobqkk',
         },
    secure: true,
    });

    
router.post('/', (req, res) => {
    const {email, subject, text, message, fullName } = req.body;
    console.log("email", email)
    const mailData = {
        from: "mnosov622@gmail.com",
        to: 'mnosov622@gmail.com',
        subject: subject,
        text: text,
        html: `${fullName} sent a message: ${message}. <br/> User email: ${email}`,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
          res.status(500).send({error: "Server error"})
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId, success:true });
    });
});

module.exports = router;