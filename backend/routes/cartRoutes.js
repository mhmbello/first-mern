const express = require("express");
const fetchUser = require("../middlewares/authMiddleware");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/addtocart", fetchUser, addToCart);
router.post("/removefromcart", fetchUser, removeFromCart);
router.post("/getcart", fetchUser, getCart);

module.exports = router;
