const express = require("express");
const router = express.Router();
const client = require("../../mongodb");
const nodemailer = require("nodemailer");

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

router.post("/", async (req, res) => {
  const db = client.db("users");
  db.collection("users")
    .find({})
    .toArray(async (err, users) => {
      const user = users.find((u) => u.email === req.body.email);
      if (user) {
        console.log("USER ALREADY EXISTS");
        return res.status(409).send("User exists");
      } else {
        console.log("user doesn't exists");

        const user = {
          name: req.body.name,
          email: req.body.email,
          token: req.body.token,
          isLearner: req?.body?.isLearner,
        };
        db.collection("users").insertOne(user, function (err, user) {
          if (err) throw err;

          console.log("user inserted", user);

          const mailData = {
            from: "litlab200@gmail.com",
            to: req.body.email,
            subject: "Welcome to LitLab!",
            html: `
            <style>
                body {
                    background-color: #f5f5f5;
                    font-family: Arial, sans-serif;
                    text-align: center;
                }
                h1 {
                    color: #1c1c1c;
                    font-size: 36px;
                    margin-top: 50px;
                }
                p {
                    color: #555555;
                    font-size: 24px;
                    margin-top: 30px;
                    line-height: 1.5;
                }
                a {
                    display: inline-block;
                    background-color: #007bff;
                    color: #fff;
                    font-size: 24px;
                    font-weight: bold;
                    text-decoration: none;
                    padding: 10px 30px;
                    border-radius: 5px;
                    margin-top: 50px;
                }
                a:hover {
                    background-color: #0056b3;
                }
                div.im {
                    color: #000000 !important;
                }
            </style>
            <h1>Welcome to our service!</h1>
            <p>Dear <b>${req.body.name}</b>,</p>
            <p>Welcome to our learning platform! We are thrilled that you have chosen us as your educational partner. Our team is dedicated to providing you with the best learning experience possible, and we can't wait to see you grow and achieve your goals. If you have any questions, comments, or suggestions, please do not hesitate to contact us. We are always here to support you on your learning journey.
            </p>
            `,
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

          res.status(200).send({ user });
        });
      }
    });
});

module.exports = router;
