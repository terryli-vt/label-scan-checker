const express = require("express");

// In Express.js, a router is a mini Express application. It helps you organize your code by handling different routes in separate files or modules. This makes your code more modular and easier to maintain.
// express.Router() creates a new router object. This router object can handle routes separately from the main app.
const router = express.Router();

const Product = require("../models/product");

// Get all products
// req: request obj, contains info about the incoming request
// res: response obj, used to send a response back to the client
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Add a new product
router.post("/", async (req, res) => {
  // Thanks to 'express.json()' middleware (see app.js)
  // If you send a POST request to /products with JSON data, the express.json() middleware will parse it, and req.body will contain the parsed JavaScript object.
  const { name, partNumber, customer } = req.body;

  let product = new Product({ name, partNumber, customer });
  // Insert the product in the MongoDB database
  product = await product.save();

  res.send(product);
});

module.exports = router; // This makes the router available to be imported in other files.
