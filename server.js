const express = require("express");
const https = require("https");
const path = require("path");

const app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "public", "html", "index.html"));
});

app.listen("3000", (req, res) => {
  console.log("listening on http://localhost 3000");
});
