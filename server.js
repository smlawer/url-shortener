const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();

// Connect to database
mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use EJS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Get all shortURLS and send to index.ejs
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

// Create new short url based on entered URL and reload page
app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

// Redirect from short URL to full URL
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (!shortUrl) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000);
