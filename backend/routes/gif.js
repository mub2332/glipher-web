const express = require("express");
const router = express.Router();
const { createGif } = require("../handler/gif.controller");

// @route   POST api/gif
// @desc    Gif Creation
// @access  Public
router.post("/", createGif);

module.exports = router;
