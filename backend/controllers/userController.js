const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check)
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });

  let cart = {};
  for (let i = 1; i <= 300; i++) cart[i] = 0;

  const user = new User({ ...req.body, cartData: cart });
  await user.save();

  const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
  res.json({ success: true, token, message: "User registered successfully" });
};

exports.login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ success: false, message: "User not found" });

  const passCompare = req.body.password === user.password;
  if (!passCompare)
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });

  const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
  res.json({ success: true, token, message: "User logged in successfully" });
};
