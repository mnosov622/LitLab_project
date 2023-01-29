const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  id: { type: Number, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isLearner: { type: Boolean },
  isCreator: { type: Boolean },
});

const User = mongoose.model("users", UsersSchema);

module.exports = {
  User,
};
