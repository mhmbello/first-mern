const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

app.use(express.json());
app.use(cors());

/* Database Connection */
//mongoose.connect("mongodb+srv://mern_forever:mhmbello@cluster0.tgt9hkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
mongoose.connect(
  "mongodb+srv://mern_forever:mhmbello@cluster0.tgt9hkx.mongodb.net/mern"
);

/* API Creation */

app.get("/", (req, res) => {
  res.send("Express App is running");
});

/* Image Storage */
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

/* Create API endpoint for image upload */
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

/* Schema for creating Products */
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Product added successfully");
  res.json({
    success: true,
    name: req.body.name,
    message: "Product added successfully",
  });
});

// Creating API For deleting Products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});

// Importer plusieurs produits depuis un fichier JSON
app.post("/importproducts", async (req, res) => {
  try {
    const products = req.body.products; // On attend un tableau de produits dans le body

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data format. Expected { products: [...] }"
      });
    }

    // Trouver le dernier id existant
    let lastProduct = await Product.findOne().sort({ id: -1 });
    let currentId = lastProduct ? lastProduct.id : 0;

    // Préparer les produits avec IDs incrémentés
    const productsWithId = products.map((p) => {
      currentId++;
      return {
        id: currentId,
        name: p.name,
        image: p.image,
        category: p.category,
        new_price: p.new_price,
        old_price: p.old_price,
        available: p.available ?? true
      };
    });

    // Insérer en masse
    await Product.insertMany(productsWithId);

    res.json({
      success: true,
      count: productsWithId.length,
      message: `${productsWithId.length} products imported successfully`
    });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to import products"
    });
  }
});

// Schema for creating user model
const User = mongoose.model("User", {
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  cartData: { type: Object, default: {} },
  isAdmin: { type: Boolean, default: false },
});

//Creating EndPoint for User
app.post('/signup', async (req, res) => {

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
})

app.post('/login', async (req, res) => {
 
  let user = await User.findOne({ email:req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
        message: "User logged in successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        errors: "Invalid password"
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      errors: "Wrong Email, User not found"
    });
  }
})

// creating Endpoint for new collection
app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection =products.slice(1).slice(-8);
  res.send(newcollection);
});

// creating endpoint for popular in women
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  res.send(popular_in_women);
});

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized ! Please login" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Please authenticate using a valid token" });
    }
  }
};

//creating endpoint for adding product in cart
app.post('/addtocart', fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Product added to cart");
});

//creating endpoint to remove product from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  if(userData.cartData[req.body.itemId] > 0){
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Product removed from cart");
  } else {
    return res.status(400).json({ success: false, message: "Product not in cart" });
  }
});

//creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  res.json({ cartData: userData.cartData });
});

app.listen(port, (error) => {
  if (error) console.log(`Error occurred: ${error}`);
  console.log(`Server is running on port ${port}`);
})
