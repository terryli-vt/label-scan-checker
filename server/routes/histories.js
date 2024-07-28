const express = require("express");

// In Express.js, a router is a mini Express application. It helps you organize your code by handling different routes in separate files or modules. This makes your code more modular and easier to maintain.
// express.Router() creates a new router object. This router object can handle routes separately from the main app.
const router = express.Router();

const History = require("../models/history");

// Get all history records
// req: request obj, contains info about the incoming request
// res: response obj, used to send a response back to the client
router.get("/", async (req, res) => {
  const histories = await History.find();
  res.send(histories);
});

// Add a new record
router.post("/", async (req, res) => {
  // Thanks to 'express.json()' middleware (see app.js)
  // If you send a POST request to /products with JSON data, the express.json() middleware will parse it, and req.body will contain the parsed JavaScript object.
  const {
    name,
    partNumber,
    dateStr,
    dateNumber,
    match,
    mismatch,
    unscannable,
  } = req.body;

  // new instance of the 'History' model
  let history = new History({
    name,
    partNumber,
    dateNumber,
    dateStr,
    match,
    mismatch,
    unscannable,
  });

  // Insert the record in the history database
  history = await history.save();

  // After saving, the variable history now contains the record as it was saved in the database, including any generated fields like _id.
  res.send(history);
});

module.exports = router; // This makes the router available to be imported in other files.
