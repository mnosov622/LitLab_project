const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is the users endpoint!");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`This is the users endpoint with id ${id}!`);
});

module.exports = router;
