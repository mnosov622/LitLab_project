const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Using fake data for now
const users = [
  {
    id: 1,
    email: "learner@gmail.com",
    password: "demo123",
    isLearner: true,
  },
  {
    id: 2,
    email: "creator@gmail.com",
    password: "demo123",
    isCreator: true,
  },
];

const secret = "superSecret";

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//TODO: implement creating account functionality
app.post("/register", (req, res) => {});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  console.log("user", user);
  if (!user) {
    res.status(404).send("You don't have an account");
  } else if (user.password === password && user.email === email) {
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, secret, { expiresIn: "2h" });
    res.status(200).send({ token, user });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }

  // const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
  // res.json({ token });

  // if (email !== "learner@gmail.com") {
  //   res.send("Login failed").status(404);
  // } else if (email === "learner@gmail.com") {
  //   res.status(200).send("Please proceed");
  // }
  // res.json({ message: "Input received" });
});

app.listen(8000, () => console.log("Server is up on port 8000"));
