const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({ id, ...req.body });
  await product.save();

  res.json({ success: true, message: "Product added successfully" });
};

exports.removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, message: "Product removed" });
};

exports.getAllProducts = async (req, res) => {
  let products = await Product.find({});
  res.json(products);
};

exports.importProducts = async (req, res) => {
  const products = req.body.products;
  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ success: false, message: "Invalid format" });
  }

  let lastProduct = await Product.findOne().sort({ id: -1 });
  let currentId = lastProduct ? lastProduct.id : 0;

  const productsWithId = products.map((p) => ({ ...p, id: ++currentId }));
  await Product.insertMany(productsWithId);

  res.json({ success: true, count: productsWithId.length });
};
