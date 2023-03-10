const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

//send email

// create reusable transporter object using the default SMTP transport

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "litlab200@gmail.com",
    pass: "fbwvydwfqefelrmb",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/", (req, res) => {
  const { email, subject, text, message, fullName } = req.body;
  console.log("email", email);
  const mailData = {
    from: "litlab200@gmail.com",
    to: "litlab200@gmail.com",
    subject: "Contact us request",
    text: text,
    html: `
    <style>
    .contact-message {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 20px;
      margin: 20px;
      max-width: 500px;
    }
    
    .contact-message h2 {
      font-size: 24px;
      margin-top: 0;
    }
    
    .contact-message p {
      font-size: 18px;
      margin: 10px 0;
    }
    
    .contact-message strong {
      font-weight: bold;
    }
    </style>
    <div class="contact-message">
    <h2>Contact Message</h2>
    <p><strong>From:</strong> ${fullName} (${email})</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong> ${message}</p>
  </div>`,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      res.status(500).send({ error: "Server error" });
      return console.log(error);
    }
    res.status(200).send({
      message: "Mail send",
      message_id: info.messageId,
      success: true,
    });
  });
});

module.exports = router;
