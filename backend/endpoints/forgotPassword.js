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
    user: "mnosov622@gmail.com",
    pass: "ywrvaepvdteobqkk",
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
  const mailOptions = {
    from: "mnosov622@gmail.com",
    to: email,
    subject: "Password Reset Request",
    html: `Click <a href="http://localhost:3000/reset-password?token=${resetToken}">here</a> to reset your password.`,
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
