const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {

  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "User already exists",
      message: "User already exists"
    });
  }

  let cart = {};
  for (let i = 1; i <= 300; i++) {
    cart[i] = 0;
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart
  });

  await user.save();

  const data = {
    user:{
      id:user.id
    }
  }

  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token,
    message: "User registered successfully"
  });
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        success: false,
        errors: "Wrong Email, User not found"
      });
    }

    // ⚠️ Tu compares le password en clair, à remplacer plus tard par bcrypt
    const passCompare = req.body.password === user.password;

    if (!passCompare) {
      return res.status(400).json({
        success: false,
        errors: "Invalid password"
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");

    // 🔥 On renvoie aussi les infos de l'utilisateur
    res.json({
      success: true,
      token,
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin, // 👈 clé pour redirection côté frontend
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      errors: "Internal server error",
    });
  }
};
