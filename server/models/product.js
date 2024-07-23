const mongoose = require("mongoose");

/*
A schema defines the structure of your collection documents. A Mongoose schema maps directly to a MongoDB collection.
*/
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
});

/* 
Models take your schema and apply it to each document in its collection.

Models are responsible for all document interactions like creating, reading, updating, and deleting (CRUD). 
*/
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
