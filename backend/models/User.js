const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  cartData: { type: Object, default: {} },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
