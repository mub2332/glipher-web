const express = require("express");
const cors = require("cors");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = express();

// Connect Database

// Middleware to use req.body
// To be able to accept data/body
app.use(cors(), express.json({ extended: false }));

//Routes
app.use("/api/gif", require("./routes/gif"));

// Health check
app.get("/*", (_, res) => res.send("Healthy"));

module.exports = app;
