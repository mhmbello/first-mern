const User = require("../models/User");

// Ajouter un produit au panier
exports.addToCart = async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
    res.json({ success: true, message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add to cart" });
  }
};

// Retirer un produit du panier
exports.removeFromCart = async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
      userData.cartData[req.body.itemId] -= 1;
      await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
      res.json({ success: true, message: "Product removed from cart" });
    } else {
      res.status(400).json({ success: false, message: "Product not in cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to remove from cart" });
  }
};

// Récupérer le panier de l’utilisateur
exports.getCart = async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch cart" });
  }
};
