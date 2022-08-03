const mongoose = require("mongoose");
const shortId = require("shortid");

// MongoDB schema for URLS
const shortUrlSchema = new mongoose.Schema({
  // full URL entered by user
  full: {
    type: String,
    required: true,
  },
  // Short URL hashed by shortID
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  // Number of clicks on shortened URL
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  // Date that shortURL was generated
  date: {
    type: String,
    required: true,
    default: new Date().toISOString().slice(0, 10),
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
