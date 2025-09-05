const express = require("express");
const { addProduct, removeProduct, getAllProducts, importProducts } = require("../controllers/productController");

const router = express.Router();

router.post("/add", addProduct);
router.post("/remove", removeProduct);
router.get("/all", getAllProducts);
router.post("/import", importProducts);

module.exports = router;
