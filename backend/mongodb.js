const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://litlab200:litlab@cluster0.fbncwuq.mongodb.net";

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

module.exports = client;
