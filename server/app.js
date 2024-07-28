const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// setting up our Express application and using a separate router for handling product-related routes.
const products = require("./routes/products");
const histories = require("./routes/histories");

// Load environment variables from .env file
require("dotenv").config();

// Initializes a new instance of an Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
// Middleware in Express.js is like a series of steps or functions that run between receiving a request from a client (like a web browser) and sending back a response.
// By default, an Express server doesn't know how to handle this JSON data. It sees it as a string.
// This line is setting up middleware that specifically deals with JSON data. It tells the server how to parse (or convert) this JSON string into a JavaScript object that the server can work with.
// When a request with JSON data comes in, this middleware parses the JSON string and makes the data available as a JavaScript object in req.body.
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Use the products route
app.use("/products", products);

app.use("/histories", histories);

app.get("/", (req, res) => {
  res.send({ message: "Hello from Express!" });
});

// Start the server, the server is waiting for network requests on port 3500 by default.
// When you run your server on "localhost," you are running it on your own computer.
// Ports are like doors on your computer that network applications use to communicate with each other. Each application or service running on your computer can listen on a specific port.
const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}`));
