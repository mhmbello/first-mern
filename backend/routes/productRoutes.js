const express = require("express");
const { addProduct, removeProduct, getAllProducts, importProducts, popularInWomen, newCollections } = require("../controllers/productController");

const router = express.Router();

router.post("/addproduct", addProduct);
router.post("/removeproduct", removeProduct);
router.get("/allproducts", getAllProducts);
router.post("/import", importProducts);
router.get("/newcollections", newCollections);
router.get("/popularinwomen", popularInWomen);
module.exports = router;
