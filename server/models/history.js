const mongoose = require("mongoose");

/*
A schema defines the structure of your collection documents. A Mongoose schema maps directly to a MongoDB collection.
*/
const historySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  dateNumber: {
    type: Number,
    required: true,
  },
  dateStr: {
    type: String,
    required: true,
  },
  match: {
    type: Number,
    required: true,
  },
  mismatch: {
    type: Number,
    required: true,
  },
  unscannable: {
    type: Number,
    required: true,
  },
});

/* 
Models take your schema and apply it to each document in its collection.

Models are responsible for all document interactions like creating, reading, updating, and deleting (CRUD). 
*/
const History = mongoose.model("History", historySchema);

module.exports = History;
