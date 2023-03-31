const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { User } = require("../models/users");
const client = require("../mongodb");
const router = express.Router();

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

//Generate a password reset token

function generateResetToken() {
  return crypto.randomBytes(20).toString("hex");
}

router.post("/", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Email not found");
  }
  console.log("user recieved", user);

  const resetToken = generateResetToken();
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  console.log("data", resetToken);
  user.save(function (err) {
    if (err) {
      console.error("Error saving user:", err);
    } else {
      console.log("User saved successfully");
    }
  });

  // Create the email
  const emailHTML = `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reset Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    
    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-top: 0;
    }
    
    p {
      margin: 1em 0;
    }
    
    a {
      color: #007bff;
      text-decoration: none;
      font-size:20px;
    }
    
  </style>
</head>
<body>
  <div class="container">
    <h1>Reset Your Password</h1>
    <p>Hello,</p>
    <p>We have received a request to reset the password for your account. Please click the link below to reset your password:</p>
    <a class="btn btn-primary fs-1" href="https://lit-lab-project.vercel.app/reset-password?token=${resetToken}" role="button">Reset</a>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Best regards,</p>
    <p>LitLab Team</p>
  </div>
</body>
</html>
`;
  const mailOptions = {
    from: "mnosov622@gmail.com",
    to: email,
    subject: "Password Reset Request",
    html: emailHTML,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent: " + info.response);
    res.status(200).send("Email sent");
  });
});

module.exports = router;
